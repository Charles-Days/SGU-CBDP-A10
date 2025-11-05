pipeline {
    agent any

    stages {
        stage('Stop Services') {
            steps {
                script {
                    bat '''
                        cd "C:\\Users\\%USERNAME%\\Desktop\\SGU-CBDP-A10"
                        docker-compose down
                    '''
                }
            }
        }

        stage('Remove Images') {
            steps {
                script {
                    bat '''
                        docker rmi client:1.0-sgu -f
                        docker rmi server:1.0-sgu -f
                    '''
                }
            }
        }

        stage('Pull from SCM') {
            steps {
                script {
                    bat '''
                        cd "C:\\Users\\%USERNAME%\\Desktop\\SGU-CBDP-A10"
                        git pull origin main
                    '''
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    bat '''
                        cd "C:\\Users\\%USERNAME%\\Desktop\\SGU-CBDP-A10"
                        docker-compose up -d --build
                    '''
                }
            }
        }
    }
}
