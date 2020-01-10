# RememberMe

## Interface Design

- Strengthened security and privacy of users via WeChat authorized login interface
- Gave full consideration on comfort and feasibility of human-computer interaction regarding exploitation on the separation of logic and rendering.
- Enhanced user experiences concerning movie and article recommendation features.

![Authorization.png](https://s2.ax1x.com/2020/01/10/lhLLtS.png)

![lhO0N8.png](https://s2.ax1x.com/2020/01/10/lhO0N8.png)

## Construction on Development Environment

### Previous data processing

- Unitized the obtained other document format into csv format for database processing with the help of Python String Library.
- Recommended articles and stored the title in Json document for personalization with the help of Python crawler technology.

### Cloud development environment

- Utilized _id and _openid to operate the cloud database on the applet front end and the server side through the API.
- Utilized getWXContext method provided by wx-server-sdk to obtain the openid in the calling cloud function.
- API was responsible for file management both in the applet front end and the cloud function side.

### Small Program Function Characterization

### Module for **Memorizing Learning** :

- Randomly generated word id within a certain range.
- Accessed the cloud database query id information and performed string processing to return to the user interface.

### Module for **Collection** :

- Formed a table in the iCloud database for storage upon clicking on the favorite button.

### Module for **Searching** :

- Extended the connection between API interface and Scallop Word webpage to receive the pronunciation and explain the example sentence.

- Accessed the cloud database query id information and performed string processing to return to the user interface.

### Module for **Referral** :

- Established a sync await to asynchronously load preferred articles and record articles of users.

- Formalized artificial personal recommendation based on historic data of users.

- Achieved the functions of similar hobby users regarding User Collaborative Filtering algorithm.

  > Calculate the similarity between two users through the Jaccard formula. 
  >
  > Let N (u) be the set of items that user u likes, and N (v) be the set of items that user v likes.
  >
  > Then the similarity of u and v is calculated by the following formula:
  >
  > `w_un=|N(u)∩N(v)|/|N(u)∪N(v)| ` 

![lhX6PO.png](https://s2.ax1x.com/2020/01/10/lhX6PO.png)

![lhXWMd.png](https://s2.ax1x.com/2020/01/10/lhXWMd.png)


