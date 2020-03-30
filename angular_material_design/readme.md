## Setting Up angular Project

* docker-compose.yml

    version: "2.0"
    services:
    angular_material_design:
        image: node:12-slim
        networks:
        - frontend
        ports:
        - 4200
        volumes:
        - ./:/app
        

    networks:
    frontend:

* docker-compose run angular_material_design sh
* npm install -g @angular/cli
* ng new app
* chmod -Rf 777 /app/src/ # To make files editable for normal users as well
* chmod -Rf 777 /app/e2e  # since these files have owner as root
* exit

## Dev Setup

        version: "2.0"
        services:
          angular_material_design:
            image: node:12-slim
            networks:
              - frontend
            ports:
              - 4200:4200
            volumes:
              - ./:/app
            command: sh /app/entry_script.sh
            environment:
              - PATH=/app/node_modules/.bin:$PATH
        
        networks:
          frontend:

### entry_script.sh

        cd app
        ng serve --host 0.0.0.0

### Run the project

    docker-compose up angular_material_design

or

    docker-compose up -d  angular_material_design

## Installing material design files

### 
* docker ps

* docker exec -it <container_id> sh

* ng version

* ng add @angular/material

Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ]
? Set up global Angular Material typography styles? Yes
? Set up browser animations for Angular Material? Yes

* npm i highcharts-angular --save
* npm i highcharts --save
* npm i @angular/flex-layout @angular/cdk --save

* Add the following module

import { MatButtonModule } from '@angular/material/button';

<button mat-raised-button color="primary">TEST</button>

ng g c layouts/default --module=app.module.ts
ng g m layouts/default
ng g c modules/dashboard --module=app.module.ts