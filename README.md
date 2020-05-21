# Wikipdia Analytics Tool

This is a Wikipedia article analytic tool providing three main functions for user to gain insights of article revisions and the users who contributed. It provide three main functions including Overall Analytics, Author Analytics and Individual Article Analytics. Each provides statistics of English Wikipedia featured articles based revision data directly downloaded via MediaWiki API.  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

1. Firstly you need to prepare the database and import some data for testing. In a development envrionment the easiest is to get started with MongoDB Atlas, a cloud version of MongoDB. Please follow this guide to create your first cluster. (or feel free to use our test cluster which is already coded in the project)

Get Started with Atlas: https://docs.atlas.mongodb.com/getting-started/

Once you are able to connect your cluster. A Python library script has been deployed in PiPy. Before using this script, python >=3.6 should be installed on your computer. 

a. Open the command in Windows or terminal in  Mac OS and execute the below command: 

```bash
pip install MongoFileImport
``` 

b. Find out your MongoDB URL by clicking "Connect" to your cluster and choose "Connect your application" option. It looks something like mongodb+srv://username:<password>@cluster0-xxxxx.mongodb.net 

c. Find out your name of the database and the name of the collection you created.
d. Get the absolute path of your data file which only contains JSON files.
d: Open your command or terminal again, and execut the below command:

```bash
MongoFileImport --mongourl <MongdoDB connection URL> --db <database name> --dir <data path> --cn <collectionname>
```

To avoid any modification of the code, it is better to set database name as “node-angular”, the name of the revision data collection as “revinfors” and a new collection named “users” should also be created. If you import your data in local database, the import command should be: 

```bash
MongoFileImport --mongourl <MongdoDB connection URL> --db node-angular --dir <data path> --cn revinfors
```

If you have any questions, you can visit https://github.com/shanzhengliu/MonogdbFileImport to get more details.


2. Next clone the project from Git repository https://github.sydney.edu.au/COMP5347-2020/COMP5347Group6 by executing the below code: 

```bash
git clone https://github.sydney.edu.au/COMP5347-2020/COMP5347Group6
```

3. Open /COMP5347Group6/group-back/app/app.js file and replace MongoDB URL for variable mongoDB with your database.

4. Place administrators.txt and bots.txt files in /COMP5347Group6/group-back/app/user_filter. 

5. Now install Angular Cli by running below codes:

```bash
npm install -g @angular/cli
```

6. Then lets start the front end Angular server by executing below code: 

```bash
cd /COMP5347Group6/web-angula/
npm install
ng serve
```

7. Finally start the backend end Node server by executing below code: 

```bash
cd /COMP5347Group6/group-back/
npm install
npm run start:server
```

Browse the application at http://127.0.0.1:4200/ 

### Prerequisites

python 3.6
angular api
nodeJS

## Running the tests

Explain how to run the automated tests for this system


## Contributing

Front-end development: Shanzheng Liu
Back-end development: David Dai & Qizhen Zhu

## Versioning

1.0

## Authors

Shanzheng Liu & David Dai & Qizhen Zhu

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
Basem Fathi Suleiman <basem.suleiman@sydney.edu.au> (he/him)
University of Sydney