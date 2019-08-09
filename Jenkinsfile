#!/usr/bin/env groovy

def dockerRegistry = "329802642264.dkr.ecr.eu-west-1.amazonaws.com"
def nodeImageVersion = "10.16.0"
def nodeImage = "${dockerRegistry}/bbc-news/node-10-lts:${nodeImageVersion}"

def nodeName
def slackChannel = "#si_repo-psammead"

def notifySlack(colour, buildStatus, gitCommitAuthor, stageName, gitCommit, gitCommitMessage, slackChannel) {
  // call the global slackSend method in Jenkins
  slackSend(color: colour, message: "*${buildStatus}* on ${env.BRANCH_NAME} [build ${BUILD_DISPLAY_NAME}] \n*Author:* ${gitCommitAuthor} \n*Stage:* ${stageName} \n*Commit Hash* \n${gitCommit} \n*Commit Message* \n${gitCommitMessage}", channel: slackChannel)
}

def cleanWS() {
  sh 'rm -rf ./app || true'
}

node {
  timeout(time: 30, unit: 'MINUTES') {
    withEnv([
      'CI=true',
      'CC_TEST_REPORTER_ID=06c1254d7c2ff48f763492791337193c8345ca8740c34263d68adcc449aff732'
    ]) {
      // git checkout
      checkout scm

      // get git commit info for notifications
      gitCommitHash = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
      gitCommitAuthor = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${gitCommitHash}").trim()
      gitCommitMessage = sh(returnStdout: true, script: "git log -1 --pretty=%B").trim()

      docker.image("${nodeImage}").inside {
        cleanWS()

        sh 'make setup-git'

        sh 'make install'

        sh 'npm run build:storybook'

        try {
          stage ('Development Tests') {
            parallel (
              'App Tests & Code Coverage': {
                sh 'make code-coverage-before-build'
                sh 'make tests'
                sh 'make code-coverage-after-build'
              },
              'ChromaticQA Tests': {
                withCredentials([string(credentialsId: 'psammead-chromatic-app-code', variable: 'CHROMATIC_APP_CODE')]) {
                  // sh 'npm run test:chromatic'
                }
              }
            )
          }

          stage ('Deploy Storybook & Publish to NPM') {
            parallel (
              'Deploy Storybook': {
                if (env.BRANCH_NAME == 'latest') {
                  sh 'npm run deploy-storybook'
                }
              },
              'Publish to NPM': {
                if (env.BRANCH_NAME == 'latest') {
                  withCredentials([string(credentialsId: 'npm_bbc-online_read_write', variable: 'NPM_TOKEN')]) {
                    sh 'make publish'
                  }
                }
              }
            )
          }

          stage ('Bump Dependants') {
            if (env.BRANCH_NAME == 'latest') {
              sh 'make bump-dependants'
            }
          }
        } catch (e) {
          notifySlack('bad', 'Failed', gitCommitAuthor, e, gitCommitHash, gitCommitMessage, slackChannel)
          throw e
        } finally {
          def buildResult = currentBuild.result ?: 'SUCCESS'

          if (buildResult == 'SUCCESS') {
            notifySlack('good', 'Success', gitCommitAuthor, '', gitCommitHash, gitCommitMessage, slackChannel)
          }
        }
      }
    }
  }
}