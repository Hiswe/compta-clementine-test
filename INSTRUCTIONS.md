# Exercice

Réalisation d‘une Todolist en vue.js avec Nuxt et Vuex

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [objectif](#objectif)
- [API](#api)
- [livrable](#livrable)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## objectif

L'objectif de l'exercice est de voir ta capacité à prendre en main une nouvelle techno rapidement, et de penser une interface dite “userfriendly“, en utilisant différents modules tels que Nuxt et Vuex.

1. Tu feras une todolist avec un CRUD basique (create, read, update, delete) depuis un store (en utilisant le mapGetters, les mutations, actions....), ou encore l’async Fetch dans la vue.
2. Dans l’idéal il faudrait qu’il y ait une vue index depuis laquelle toutes ces interactions seront possibles, sinon tu peux faire des interactions via la page de la tâche.
3. Tu pourras t’aider de l'API suivante : https://jsonplaceholder.typicode.com/

## API

Voici les endpoints de I'API:

- `/todos` GET
  Route index qui retourne toutes les todo
- `/todos` POST
  Route create qui te permet de créer une todo
- `/todos/{id}` GET
  Route show qui permet de voir une todo par son ID
- `/todos/{id}` PUT
  Route update qui permet de mettre à jour une todo en y accédant par son ID et en lui passant un paramètre à mettre à jour.
- `/todos/{id}` DELETE
  Route qui supprime une todo

4. Encore mieux, tu utilises le framework Vuetify pour l’UI.

## livrable

Tu utiliseras GitHub et nous enverras le lien de ton repo une fois que tu auras terminé pour que l'on puisse voir le code, s'il te plaît.
NB:

- Gère ton repo avec soin (commit réguliers, branch)
- Hoster le projet n’est pas nécessaire.
