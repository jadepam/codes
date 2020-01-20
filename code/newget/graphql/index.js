var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' ,index:()=>"index" };//真实api接口返回

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});