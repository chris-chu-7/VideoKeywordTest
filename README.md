# VideoKeywordTest

```
pyenv install --dev
```
Example used: https://www.youtube.com/watch?v=PSnSo9kYlH4

<b> Inspiration </b> 

Since the COVID-19 pandemic last year, classrooms have switched almost entirely to virtual learning. Many students now more than ever rely on educational online videos to get through their classes. As current and recently graduated college students, we found that rewatching lecture videos can make learning very effective. We had several challenges in these videos:

🕒 Scanning for keywords in the videos are very time consuming
📓 Jotting down the timestamps of important keywords so we can replay them are annoying
😩 Writing down flashcards for important spoken terms takes out the immersiveness from the actual video
What it does
😄 Echocards is an innovate approach to creating and studying flashcards more immersive and fun.
▶️ By entering a YouTube video link to the site, Echocards will immediately start transcribing the audio to text for you.
🔊 With Echocards, you can see a transcript of the video in sync with the video and pick out important terms to study. You can create flashcards using a video segment and the important keywords in that segment.
👂 Lastly, Echocards let's you study flashcards you made with the video audio playing. In the flashcards, Echocards will play the video audio but with the keywords muted. This technique better enhances the contextual recognition of important terms using not only visual aids but also audible aids.
How we built it
We used Python FastAPI for the backend and React using TypeScript for the frontend. In addition, we several of Google Cloud Platform's APIs. We used the Google Cloud Speech-to-Text API for transcribing the YouTube videos, Google Cloud Storage for storing the videos/audio, Google Cloud Compute the virtual machine running our Docker container, and Google Cloud DNS for managing our domain that we registered from Domain.com (http://protect-nezuko.tech/).



<b> Challenges we ran into </b> 

Spending a lot of time setting up our Python environment across Windows and Mac machines 😓
Figuring out the acceptable audio encoding and how to convert from different audio formats
Setting up our registered domain name http://protect-nezuko.tech/ only to find we put in the wrong nameservers 😅
Accomplishments that we're proud of
Built something out of Google Cloud for the first time!
Our app works like we first wanted it to be!
Learned so much about backend and frontend technologies we were not familiar with.
We did this all while being remote!

<b>What we learned</b>

Google Cloud is very accessible and has amazing API services we haven't heard of!
We learned how to create a full stack app from scratch with some of our favourite technologies.
Lastly, we learned designing and prototyping a product is actually hard work.😌
What's next for Echocards
Improve our UI because our initial design felt a little too simplistic. For example, adding the list of terms on the home page and adding a card deck page.
Better format the words and sentences using the Speech-to-Text API to also include proper punctuation and grammar.
Enable users to more interactively test flashcards like fill-in-the-blank style of tests.
Add support for uploaded videos outside of just YouTube
Add classroom and user functionality to store decks in a database
Add a way to suggest keywords using AI like in the OpenAI Keywords example

<b>Built With</b>

cloud, docker, google, python, react, text-to-speech


<b>Try it out</b> 

protect-nezuko.tech
GitHub Repo
 docs.google.com
