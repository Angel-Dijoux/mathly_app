# MathLy WebApp

### This app is developed with Python3.9.6 and Django3.2.2

If you want edit MathLy or install this app for debug, it is recommended to use Docker, follow thes steps: 
  
  Download this repo and place this in a projects file.

  And install Docker in your computer: https://docs.docker.com/engine/install/
  
  Do you need install Docker-Compose in Linux:

    sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose && sudo chmod +x /usr/bin/docker-compose

  And run this ``docker-compose.yml``
  
          version: '3.3'
    services: 
        web:
            image: elki97413/django_server
            container_name: python_web
            command: python manage.py runserver 0.0.0.0:8001
            volumes: 
                - .:/app
            restart: always
            ports: 
                - 85:8001
            
  
  **NOTE : This Docker-compose file is in repo, and change first port if is use.**
  
   Run ``docker-compose up`` in your projet folder for start server Django ! 
  
  **And go : http://localhost:85**
  
  
  *Mathly has only one site, any modifications will be discussed and applied if relevant, under no circumstances is a publication of the exact copy of the site allowed!* --> https://www.mathly.v6.army
