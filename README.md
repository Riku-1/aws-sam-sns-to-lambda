## What's this?
AWS SAM template for lambda pushing message to slack invoked by sns.

### diagram
![diagram](https://user-images.githubusercontent.com/43313042/86126387-32423e00-bb19-11ea-8d4d-111a56b7f895.png)


### How to test
To test lambda with sample json file:
```
sam local invoke -e events/events.json
```
