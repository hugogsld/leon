# Léon 🦎

**Le soir, Léon prend le relais de l'AVS : l'élève pense à voix haute, sa copie s'écrit.**

Léon aide les élèves en situation de handicap moteur à faire leurs devoirs seuls, à la voix et au regard.

👉 **Démo en ligne : https://leon-ecole.vercel.app**

## Le parcours

1. **L'AVS dépose le devoir** : elle scanne le QR code avec son téléphone et photographie la feuille (ou importe un PDF).
2. **Léon lit le devoir** : l'IA découpe le sujet en exercices, parties et questions, recopie les énoncés (formules comprises) et ne résout jamais rien.
3. **L'élève travaille seul** :
   - « **speak** » : la dictée démarre, son raisonnement s'écrit dans le **brouillon** ; « speak » à nouveau : Léon résume le brouillon et rédige la **réponse** sous l'énoncé, maths au propre ;
   - « **caméléon** » : ouvre Léon, le prof qui aide à penser sans jamais souffler ; « chut » le fait taire ;
   - « **regard** » : la tête et les yeux pilotent l'interface (choisir un devoir, question suivante, vérifier) ;
   - « **Vérifier** » : vert si c'est juste, rouge avec un indice sinon.
4. **Export PDF** : énoncé, brouillon (ses mots), aides de Léon et réponse : le professeur voit le raisonnement, pas seulement le résultat.

## Technique

- Site statique + fonctions serverless sur **Vercel**, stockage **Vercel Blob**.
- Lecture des devoirs : **Claude** (découpage en direct, streaming).
- Léon, synthèse et vérification : **Gemini** et **Claude** en parallèle, tuteur local hors ligne en secours.
- Dictée : reconnaissance vocale du navigateur. Regard : **MediaPipe** (iris + orientation de la tête), entièrement dans le navigateur, aucune image ne quitte l'appareil.
