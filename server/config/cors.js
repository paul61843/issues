const whitelist = ['http://localhost:4321']; 

export const corsOptions = {
  origin: [
    'http://localhost:4321',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
}