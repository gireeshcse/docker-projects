## Deployments having different versions of the updates

* app.v1.deployment.yml
* app.v2.deployment.yml
* app.v3.deployment.yml

### Initial application is launched using

    kubectl create -f app.v1.deployment.yml --save-config

    kubectl get all
    # above command output
    NAME                            READY   STATUS    RESTARTS   AGE
    pod/node-app-85dcdf447c-hqt7x   1/1     Running   0          112s
    pod/node-app-85dcdf447c-nzrf9   1/1     Running   0          112s

    NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
    service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   71d

    NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/node-app   2/2     2            2           114s

    NAME                                  DESIRED   CURRENT   READY   AGE
    replicaset.apps/node-app-85dcdf447c   2         2         2       113s

### To port-forward

    kubectl port-forward node-app-85dcdf447c-hqt7x 5001:8080

### To update the appplication

    kubectl apply -f app.v2.deployment.yml

THe above command rollbacks new pods with app.v2 is created one by one.After successful creation of one pod then one of old pod is removed and this repeated until all desired nodes are created.So there zero downtime in the application.User will not find any downtime if we configured load-balancer


## Building Docker Images

docker build -t <your username>/node-web-app:tag .

    # For First application
    cd app_v1/app
    docker build -t gireeshcse/node-demo-k8:v1 .

    # For second application
    cd app_v2/app
    docker build -t gireeshcse/node-demo-k8:v2 .

    # For third application
    cd app_v3/app
    docker build -t gireeshcse/node-demo-k8:v3 .

## To view images in the system

docker images

    docker images
    # Sample Output of above command
    REPOSITORY                                TAG                 IMAGE ID            CREATED             SIZE
    gireeshcse/node-demo-k8                   v3                  17821baf30e3        22 seconds ago      157MB
    gireeshcse/node-demo-k8                   v2                  163a0b12c6ad        42 seconds ago      157MB
    gireeshcse/node-demo-k8                   v1                  3c5f0d1c347b        4 minutes ago       157MB


## To run the image

    docker run -p external_port:internal_port -d [image-name]

* -d runs the container in detached mode, leaving the container running in the background
* The -p flag redirects a public port to a private port inside the container


    docker run -p 5001:8080 -d gireeshcse/node-demo-k8:v1
    docker run -p 5002:8080 -d gireeshcse/node-demo-k8:v2
    docker run -p 5003:8080 -d gireeshcse/node-demo-k8:v3

## Status of docker application

The **docker ps** command only shows running containers by default.To see all containers, use the -a (or --all) flag

    docker ps
    docker ps --all
    # Enter the container
    $ docker exec -it <container id> /bin/bash

## To Stop the container

    docker stop container_id
    docker stop 5255454c7e53

## Start one or more stopped containers

    docker start 5255454c7e53


## To view images present in your System

    docker images

    # Sample Output
    REPOSITORY                                TAG                 IMAGE ID            CREATED             SIZE
    gireeshcse/node-demo-k8                   v3                  17821baf30e3        17 minutes ago      157MB
    gireeshcse/node-demo-k8                   v2                  163a0b12c6ad        17 minutes ago      157MB
    gireeshcse/node-demo-k8                   v1                  3c5f0d1c347b        21 minutes ago      157MB

## To remove a container

    docker rm 31a06f5dbba7
    docker rm -f 31a06f5dbba7

* -f force to remove running container

## To Remove one or more images

docker rmi -f image 

    docker rmi  -f 17821baf30e3

To remove images based on pattern

    docker images -a | grep "pattern" | awk '{print $3}' | xargs docker rmi
    # To remove images with <none> as repository 
    docker images -a | grep "^<none>" | awk '{print $3}' | xargs docker rmi