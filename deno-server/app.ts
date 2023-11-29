import express from 'npm:express@4';

const app = express();

const htmlA = `
  <style>
    body{
      border:1px solid red;
    }
  </style>
  <script src="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/lodash.js/4.17.21/lodash.js"></script>

  <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>

  <script>
    const chunk = _.chunk(['a', 'b', 'c', 'd'], 2)
    console.log("chunk=>",chunk)
  </script>
    <div id="aa">aa pge</div>
    <script src="/aa/static/js/dynamic.js"></script>
   
`;

// <script src="http://localhost:8080/"></script>

const htmlB = `
    <style>
      body{
        border:1px solid green;
      }
    </style>
    <div id="bb">bb page</div>
`;
app.get('/a', (request, response) => {
  response.send(htmlA);
});

app.get('/b', (request, response) => {
  response.send(htmlB);
});

app.listen(3000);
