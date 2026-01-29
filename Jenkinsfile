pipeline {

  agent any

  environment {
    PROJECT_ID = "neat-pagoda-477804-m8"
    REGION = "us-central1"
    REPO = "myrepo"
  }

  stages {

    stage('GCP Login') {
      steps {
        withCredentials([file(credentialsId: 'gcp-key', variable: 'KEY')]) {
          sh '''
            gcloud auth activate-service-account --key-file=$KEY
            gcloud config set project $PROJECT_ID
            gcloud auth configure-docker $REGION-docker.pkg.dev --quiet
          '''
        }
      }
    }

    stage('Build Images') {
      steps {
        sh 'docker compose build'
      }
    }

    stage('Push Images') {
      steps {
        sh 'docker compose push'
      }
    }

    stage('Deploy Backend') {
      steps {
        sh '''
          gcloud run deploy backend-service \
            --image $REGION-docker.pkg.dev/$PROJECT_ID/$REPO/backend-app \
            --region $REGION \
            --allow-unauthenticated \
            --port 8080
        '''
      }
    }

    stage('Deploy Frontend') {
      steps {
        sh '''
          gcloud run deploy frontend-service \
            --image $REGION-docker.pkg.dev/$PROJECT_ID/$REPO/frontend-app \
            --region $REGION \
            --allow-unauthenticated \
            --port 80
        '''
      }
    }

  }
}
