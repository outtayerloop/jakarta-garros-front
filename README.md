jakarta-garros-front

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

### ARCHITECTURE

**Lors de l'ouverture du dossier du projet, sélectionner le dossier qui contient directement le package.json**
- Pour vérifier qu'on se trouve au bon endroit, lancer dans le terminal de Visual Studio Code la commande $ls pour vérifier qu'elle retourne bien le package.json
- (voir `reposCheck.PNG` dans le dossier `devServerHost.PNG`)

Dans le dossier `components` : 
- chaque ajout de page se fera dans ce dossier sous la forme d'un fichier .vue (majuscule pour la première lettre du nom du fichier)
- Dans les fichiers .vue, il faut toujours faire un export comme ci-dessous avec le nom de la page (minuscule) à la place de exemple
NB: ce nom de page sera le même que celui utilisé dans le `router.js`
```js
export default {
  name: "exemple"
}
```
Voir doc Vue.js pour syntaxe etc..

- Si besoin est, importer `contants.js` qui contient les constantes utilisés dans le projet, ne pas hésiter à en ajouter une afin d'éviter les erreurs d'inattention (par ex: url de l'api, constante numérique (statut réponse http) etc..)
Par convention, toujours écrire ces constantes en majuscules et avec des underscore (ex: API_BASE_URL)

Dans le dossier `router` :
- Lorsqu'on a ajouté une page, ajouter son url relatif avec le même nom que dans la vue (propriété **name** dans export default)
(prendre exemple sur ce qui a déjà été fait (test))
- **L'export default se trouve dans la balise script de la vue** 
```js
 {
    path: "/test",
    name: "test",
    component: Test
}
``` 
- Importer le composant pour pouvoir préciser lequel est utilisé dans le router.
(prendre exemple sur ce qui a déjà été fait (test))
```js
import Test from '../components/Test'
```

Dans le dossier `plugins` : 
- Il contient la configuration de la bibliothèque de composants graphiques vuetify, pas besoin d'y toucher.

Dans le dossier `assets` : 
- Il contient les images etc...

Dans le `.gitignore` : 
- NE JAMAIS AU GRAND JAMAIS, PUSH LE DOSSIER NODE_MODULES.
Nous l'avons donc ajouté au .gitignore, car il permet de spécifier ce qui sera ignoré lors des pushs git.
- *Les fichiers .babelrc, et .editorconfig le sont aussi dans l'hypothèse où ils sont présents dans le projet*

Dans le fichier `App.vue` :
- Ce fichier est la racine de toutes les pages, il va servir de layout.
**Il n'as pas besoin d'être modifié.**

Dans le fichier `index.html` :
- Il est appelé par le main.js afin de lancer l'application.

Dans le fichier `main.js` :
- C'est le point d'entrée de notre application, il va nous permettre de build celle-ci et d'avoir tout les imports (vue, vuetify, router, app...).

Dans le fichier `package.json` :
- Pour le premier lancement de l'application, il faut ABSOLUMENT lancer **npm install**, cette commande va créer le dossier `node_modules` qui contient toutes les librairies utilisés dans le cadre du projet front. Elle va aussi créer le fichier `package-lock.json` et celui-ci contiendras l'ensemble des versions des diffèrentes librairies utilisés, tout en garantissant la bonne compatibilité entre chacunes.
- Il contient : le nom du projet, les auteurs, la version, la licence, la description ainsi que les dépendances et les scripts de lancement.

**Pour lancer l'application, on va écrire la ligne de commande suivante dans le terminal :**
```bash
npm run dev
```

Dans le fichier `webpack.config.js` :
- Il faut que l'on soit tous sur le port 3000 du localhost, pour cela, il faut que dans ce fichier, la propriéte `port` de l'objet `devServer` soit 3000. Si elle n'éxiste pas, l'ajouter. (voir `devServerHost.PNG` dans le dossier `assets`)
- Il contient le point d'entrée (main.js) dans l'objet `module.exports`, c'est la propriété `entry`.