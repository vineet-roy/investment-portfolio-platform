export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Investment Platform API',
    description: 'This API powers a investment platform that enables users to manage their investments, track real-time cryptocurrency prices, and view portfolio performance. The platform integrates MetaMask for wallet connectivity and provides secure and scalable endpoints for user authentication, portfolio management',
    termsOfService: '',
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000/api',
    },
  ],
  tags: [
    { name: 'Authentication', description: 'authentication to application' },
    { name: 'User', description: 'fetch user and create new user' },
    { name: 'Portfolio', description: 'portfolio operations' },
  ],
  components: {
    parameters: {
      PageIndexParam: {
        name: 'pageIndex',
        in: 'query',
        description: 'The index of the page to retrieve.',
        required: false,
        schema: {
          type: 'integer',
          default: 1,
          example: 1,
        },
      },
      ResultsPerPageParam: {
        name: 'pageSize',
        in: 'query',
        description: 'The number of items on each page.',
        required: false,
        schema: {
          type: 'integer',
          default: 10,
          example: 10,
        },
      },
    },
    responses: {
      '204': {
        description: 'Successfully deleted the resource',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 204,
                },
                message: {
                  type: 'string',
                  example: 'Resource successfully deleted.',
                },
              },
            },
          },
        },
      },
      '400': {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'integer', example: 400 },
                message: { type: 'string', example: 'The request is invalid.' },
              },
            },
          },
        },
      },
      '401': {
        description: 'Unauthorised',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'integer', example: 401 },
                message: { type: 'string', example: 'Invalid credentials provided.' },
              },
            },
          },
        },
      },
      '403': {
        description: 'Forbidden',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'integer', example: 403 },
                message: { type: 'string', example: 'Access is denied. You do not have the necessary permissions.' },
              },
            },
          },
        },
      },
      '404': {
        description: 'Not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'integer', example: 404 },
                message: { type: 'string', example: 'The requested entity does not exist.' },
              },
            },
          },
        },
      },
      '409': {
        description: 'Already Exist!',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'integer',
                  example: 409,
                },
                message: {
                  type: 'string',
                  example: 'Entity already exist with this details.',
                },
              },
            },
          },
        },
      },
      '500': {
        description: 'Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'integer', example: 500 },
                message: { type: 'string', example: 'An unexpected error occurred.' },
              },
            },
          },
        },
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'integer', example: 1 },
          firstName: { type: 'string', example: 'Moresh' },
          lastName: { type: 'string', example: 'Koken' },
          email: { type: 'string', example: 'moresh@gmail.com' },
          password: { type: 'string', format: 'string', example: 'Moresh@12345' },
          createdAt: { type: 'string', format: 'timestamp', example: '2024-09-18 14:00:00' },
          updatedAt: { type: 'string', format: 'timestamp', example: '2024-09-18 14:00:00' },
        },
        required: ['firstName', 'lastName', 'email', 'password', 'cashLimit'],
      },
      Portfolio: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '63e4c2f8b4d4b47c6d7a1d8e' },
          userId: { type: 'string', example: '63e4c2f8b4d4b47c6d7a1d8f' },
          walletAddress: { type: 'string', example: '0x1234abcd5678efgh9012ijklmnop3456' },
          holdings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                symbol: { type: 'string', example: 'BTC' },
                name: { type: 'string', example: 'Bitcoin' },
                balance: { type: 'string', example: '1.5' },
                chain: { type: 'string', example: 'Ethereum' },
                usdValue: { type: 'integret', example: 10.5 },
              },
            },
          },
          createdAt: { type: 'string', format: 'timestamp', example: '2024-12-05T14:00:00Z' },
          updatedAt: { type: 'string', format: 'timestamp', example: '2024-12-05T15:00:00Z' },
        },
        required: ['userId', 'walletAddress', 'holdings'],
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    { bearerAuth: [] },
  ],

  paths: {
    '/v1/auth/login': {
      post: {
        summary: 'User login',
        description: 'Authenticate user and return user data with JWT token',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'moresh@gmail.com',
                  },
                  password: {
                    type: 'string',
                    example: 'Moresh@12345',
                  },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful login',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      example: 200,
                    },
                    message: {
                      type: 'string',
                      example: 'Logged In!',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        token: {
                          type: 'string',
                          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                        }
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            $ref: '#/components/responses/400',
          },
          '500': {
            $ref: '#/components/responses/500',
          },
        },
      },
    },
    '/v1/users/signup': {
      post: {
        summary: 'Create a new user',
        description: 'Register a new user',
        tags: ['User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  firstName: {
                    type: 'string',
                    example: 'Moresh',
                  },
                  lastName: {
                    type: 'string',
                    example: 'Kokane',
                  },
                  email: {
                    type: 'string',
                    example: 'moresh@gmail.com',
                  },
                  password: {
                    type: 'string',
                    example: 'Moresh@12345',
                  },
                },
                required: ['firstName', 'lastName', 'email', 'password'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User Registered!',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      example: 200,
                    },
                    message: {
                      type: 'string',
                      example: 'User Registered Successfully!',
                    },
                    data: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
          '409': {
            description: 'User already registered with this email.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'integer',
                      example: 409,
                    },
                    message: {
                      type: 'string',
                      example: 'User already registered with this email.',
                    },
                  },
                },
              },
            },
          },
          '400': {
            $ref: '#/components/responses/400',
          },
          '500': {
            $ref: '#/components/responses/500',
          },
        },
      },
    },
    '/v1/users/{id}': {
      get: {
        tags: ['User'],
        summary: 'Find user by ID',
        description: 'Returns a single user',
        operationId: 'getUserById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of payment to return',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'User fetched!' },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/401' },
          '404': { $ref: '#/components/responses/404' },
          '500': { $ref: '#/components/responses/500' },
        },
      },
    },
    "/v1/portfolio/holdings": {
      "get": {
        "summary": "Get wallet holdings",
        "description": "Retrieve wallet holdings from the database for the authenticated user.",
        "tags": ["Portfolio"],
        "security": [{ "bearerAuth": [] }],
        "responses": {
          "200": {
            "description": "Returns the portfolio holdings.",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Portfolio" }
              }
            }
          },
          "404": { "$ref": "#/components/responses/404" },
          "401": { "$ref": "#/components/responses/401" }
        }
      },
      "post": {
        "summary": "Update wallet holdings",
        "description": "Fetch holdings from the blockchain, update or create the portfolio in the database for the authenticated user.",
        "tags": ["Portfolio"],
        "security": [{ "bearerAuth": [] }],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "walletAddress": {
                    "type": "string",
                    "description": "The wallet address for which to update or create the portfolio."
                  }
                },
                "required": ["walletAddress"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Returns the updated or newly created portfolio.",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Portfolio" }
              }
            }
          },
          "400": { "$ref": "#/components/responses/400" },
          "401": { "description": "Unauthorized. JWT is required for authentication." },
          "500": { "$ref": "#/components/responses/500" }
        }
      }
    }
  }
  
};
