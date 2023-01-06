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

## CSS

> npm install bootstrap --save
> npm install bootswatch --save

> npm install ngx-bootstrap --save

## Firebase

Après avoir copié les clés de Firebase dans environment.ts, 
ajouter dans .gitignore : /src/environments/**
Puis : 
> git rm --cached src/environments/** 

## Ajouter les modèles

ng generate class shared/models/user --skip-tests
ng generate class shared/models/workday --skip-tests
ng generate class shared/models/task --skip-tests

## Composants de la HOME Page

// Composant de la page Home
ng generate component public/home/home --module home --inline-style --skip-tests

// Composant dumb de la bannière
ng generate component public/home/home-banner --module home --skip-tests

// Composant dumb de l'affichage d'une carte de fonctionnalité
ng generate component public/home/home-feature-card --module home --inline-style --skip-tests

// Composant smart des fonctionnalités
ng generate component public/home/home-features --module home --inline-style
--skip-tests

## NavBar

ng generate component core/components/navbar --module=core --skip-tests --export=true

## Footer

ng generate component core/components/footer --module=core --inline-style --skip-tests --export=true

## Page Planning

ng generate component protected/planning/planning --module=planning --inline-style --skip-tests

ng generate component protected/planning/planning-workday-list --module=planning --inline-style --skip-tests

ng generate component protected/planning/planning-workday-item --module=planning --inline-style --skip-tests

## Ajout des autres composants pour pouvoir ensuite définir les routes

### Composant de page : Login
ng generate component public/login/login --module login --inline-style --skip-tests

### Composant de page : Register
ng generate component public/register/register --module register --inline-style --skip-tests

### Composant de page : Dashboard
ng generate component protected/dashboard/dashboard --module dashboard --inline-style --skip-tests

### Composant de page : Workday
ng generate component protected/workday/workday --module workday --inline-style --skip-tests

### Composant de page : Profil
ng generate component protected/profil/profil --module profil --inline-style --skip-tests

### Composant de page : Parameters
ng generate component protected/parameters/parameters --module parameters --inline-style --skip-tests

### Composant de page : PageNotFound
ng generate component core/components/page-not-found --module core --export true --inline-style --skip-tests

### Composant menu latéral

ng generate component shared/components/sidenav --module shared --export true -–skip-tests

ng generate component protected/protected --module protected --flat true --skip-tests

## LAZY LOADING

ng generate public/login/login-routing --module=public --flat

## formulaires inscription et register

ng generate component public/register/register-form --module register --inline-style --skip-tests

ng generate component public/login/login-form --module login --inline-style --skip-tests

## Formulaire complexe - WORKDAY

### Composant SMART
ng generate component protected/workday/workday-form --module workday --inline-style --skip-tests

### Composants DUMB
// Composant pour le champ date
 ng generate component protected/workday/workday-form-date --module workday --inline-style --skip-tests

 // Composant représentant l’ensemble des taches prévues.
 ng generate component protected/workday/workday-form-tasks --module workday --inline-style --skip-tests

 // Composant pour l’édition et la suppression d’une tâche individuelle, avec un fichier de style !
 ng generate component protected/workday/workday-form-tasks-item --module workday --skip-tests

 // Composant pour l’ajout d’une nouvelle tâche.
 ng generate component protected/workday/workday-form-tasks-add --module workday --inline-style --skip-tests

 // Composant pour le champ dédié à la prise de notes.
 ng generate component protected/workday/workday-form-notes --module workday --inline-style --skip-tests

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
