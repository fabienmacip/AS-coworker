# Etapes

> ng new awesome-list --prefix=al --style=scss --routing

Dans tsconfig.json
Ajout de : "strictPropertyInitialization": false,

> ng generate module core --module app
> ng generate module shared
> ng generate module public --routing --module core
> ng generate module protected --routing --module core

> ng generate module public/home --module public
> ng generate module public/register --module public
> ng generate module public/login --module public 

> ng generate module protected/dashboard --module protected
> ng generate module protected/parameters --module protected 
> ng generate module protected/planning --module protected
> ng generate module protected/profil --module protected
> ng generate module protected/workday --module protected


## Réorganiser les importations de ses modules
Imaginons que plus tard, nous ajouterons des formulaires dans plusieurs modules différents. Nous serons obligés d’importer le module natif ReactiveFormsModule à chaque fois. Mais grâce à la factorisation que nous allons faire, il suffira d’importer une seule fois le ReactiveFormsModule dans le SharedModule, et il sera directement disponible pour tous les autres modules (enfin, tous les autres modules qui importent le SharedModule).

Remplacer
import { CommonModule } from '@angular/common';
par 
import { SharedModule } from 'src/app/shared/shared.module';

















##################################################################

# AwesomeList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
