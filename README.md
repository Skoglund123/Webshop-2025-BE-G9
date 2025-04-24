

 HAKIM LIVS – Backend
Skapad av Mohamed Dukale, Johan Jankell samt Filip Skoglund. Detta är backend-delen av projektet HAKIM LIVS, byggd för att stödja en e-handelsplattform. Den tillhandahåller API:er för hantering av produkter, kategorier, beställningar och användarautentisering. Backend är utvecklad med Node.js och Express, och använder MongoDB via Mongoose som databas.

Projektlänkar
Live Backend (API):


Live Frontend (tidigare frontendteamet):
 https://webshop-2025-fe.vercel.app/
Live Frontend (efter frontendteamet):
https://webshop-2025-fe-fork.vercel.app/
GitHub Backend Repo:
https://github.com/Skoglund123/Webshop-2025-BE-G9.git 
 Utvecklingsanteckningar
Teknisk stack
Backend: Node.js, Express.js


Databas: MongoDB (via Mongoose)


Autentisering: JWT



 Installationsinstruktioner
1. Klona projektet
git clone https://github.com/Skoglund123/Webshop-2025-BE-G9.git
cd <projektmapp>

2. Installera beroenden
npm install

3. Miljövariabler
Skapa en .env-fil i projektets rotmapp och lägg till:
PORT=3001
JWT_SECRET=<ditt-hemliga-jwt>
MONGODB_URI=<din MongoDB Atlas URI>

4. Starta servern
npm run dev

Backend körs då på:
 http://localhost:3001

 Deploymentinfo
Backend deployades med GitHub → Vercel. Alla pushar till main deployar automatiskt.
Vercel-inställningar
Lägg till miljövariabler i “Project Settings” på Vercel:


PORT


JWT_SECRET


MONGODB_URI (via integration)


Följde denna guide från läraren:
  https://willandskill.notion.site/Projekt-upps-ttning-Backend-1b617cd17715819f88bcfe61c83f5409

 API Documentation
Huvud-URL:
https://webshop-2025-fe-fork.vercel.app/
Exempel på endpoints:
GET /api/products – Hämta alla produkter


POST /api/products – Skapa ny produkt (admin)


PUT /api/products/:id – Uppdatera produkt (admin)


DELETE /api/products/:id – Ta bort produkt (admin)


POST /user/login – Logga in


POST /api/orders – Skapa ny order



Användningsinstruktioner
Roller
Kund:
Se produkter


Skapa ordrar


Admin:
Logga in


Hantera produkter


Se ordrar


Uppdatera orderstatus


Testanvändare (admin)
Användarnamn: Admintest


Lösenord: Admintest1234



Mappstruktur
📁 Webshop-2025-BE-G9-main/
├── 📁 node_modules/
├── 📁 src/
│   ├── 📁 __tests__/                
│   ├── 📁 config/                   
│   │   └── dbConnection.js
│   ├── 📁 controllers/             
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── 📁 middleware/              
│   ├── 📁 models/                  
│   └── 📁 routes/                  
│       ├── apiDocs.js
│       ├── categoryRoutes.js
│       ├── orderRoutes.js
│       ├── productsRoutes.js
│       └── userRoutes.js
├── .babelrc                        
├── .env                            
├── .gitignore                      
├── index.js                        
├── jest.config.js                  
├── jest.setup.js                   
├── package.json                    
├── package-lock.json               


