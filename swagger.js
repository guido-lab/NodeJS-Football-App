module.exports = app => {
    const swaggerJsDoc = require("swagger-jsdoc");
    const swaggerUi = require("swagger-ui-express");
    
    // https://swagger.io/specification/#infoObject
    const swaggerOptions = {
        swaggerDefinition: {
          info: {
            version: "1.0.0",
            title: "FootballApp API",
            description: "FootballApp API Information",
            contact: {
              name: "Guido Xhindoli"
            },
            servers: ["http://localhost:8082"]
          }
        },
        apis: ['./app/routes/*.js']
      };
  
      const swaggerDocs = swaggerJsDoc(swaggerOptions);
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    };
