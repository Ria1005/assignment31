pipeline {
    agent any

    stages {

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                bat 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                echo 'Starting containers...'
                bat 'docker-compose up -d'
            }
        }

        stage('Verify') {
            steps {
                echo 'Checking containers...'
                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline Success 🚀'
        }
        failure {
            echo '❌ Pipeline Failed'
        }
    }
}
