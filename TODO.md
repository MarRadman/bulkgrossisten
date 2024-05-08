#TODO
Bulkgrossisten
Projekt: Matleverans: https://www.foodora.se/ & https://www.hellofresh.se/

1. Planering och Design:
   1.1 Definiera funktioner och målgrupp:
   Identifiera huvudfunktioner för Bulkgrossisten, inklusive användarregistrering, bläddra i produkter, skapa beställningar, betalningsintegration och leveransspårning.
   Definiera din målgrupp tydligt: personer som tränar och vill köpa hälsosam mat i bulk.
   1.2 Skissa användargränssnittet:
   Skapa wireframes eller skisser för olika delar av applikationen, inklusive startsida, produktöversikt, kundvagn och betalningssida.
   Tänk på enkelhet och användarvänlighet för att göra det lätt för användare att navigera och beställa.
   1.3 Designa databasstrukturen:
   Identifiera de viktigaste entiteterna i din applikation, såsom användare, produkter, beställningar och leveransinformation.
   Utforma relationerna mellan dessa entiteter och bestäm vilka attribut varje entitet behöver ha.

2. Frontend-utveckling med TypeScript och React:
   2.1 Implementera användarautentisering:
   Skapa användargränssnitt för inloggning, registrering och utloggning.
   Använd Context API eller Redux för att hantera autentiseringsstatus och användarinformation globalt i applikationen.
   2.2 Skapa användargränssnitt för produktvisning och beställning:
   Designa och implementera användargränssnitt för att visa produkter och lägga till dem i kundvagnen.
   Implementera funktioner för att hantera kundvagnen och skapa beställningar.

3. Backend-utveckling med TypeScript och Express:
   3.1 Implementera autentisering och routes:
   Skapa en användarhanteringsmodul för autentisering och användarhantering med JWT.
   Skapa API-rutter för att hantera autentiseringsbegäranden och beställningar.
   3.2 Anslut till PostgreSQL-databasen:
   Konfigurera en anslutning till din PostgreSQL-databas från din Express-app.
   Använd ett ORM-bibliotek som TypeORM eller Sequelize för att interagera med din databas.

4. Integrationer och betalningar:
   4.1 Betalningsgatewayintegration:
   Välj och implementera en betalningsgatewaytjänst som möjliggör säkra betalningar.
   Integrera betalningsgatewayen i din backend för att hantera betalningar från användare.
   4.2 Kartintegration för leveransspårning:
   Integrera en karttjänst för att möjliggöra leveransspårning i realtid för användare.
   Visa leveransinformation och spårningsstatus för användarna.

5. Testning och Felsökning:
   5.1 Enhetstestning och Integrationstestning:
   Skriv och kör enhetstester och integrationstester för både frontend och backend.
   Använd verktyg som Jest och Mocha för testning.
   5.2 Felsökning:
   Implementera loggning och övervakning för att felsöka och identifiera problem.
   Använd utvecklarverktyg för att inspektera och debugga frontend- och backend-koden.

6. Deployment och Skalning:
   6.1 Deployment:
   Deploya din frontend och backend på en molnbaserad plattform som AWS, Heroku eller Azure.
   Konfigurera CI/CD-pipeline för att automatisera bygg- och deploymentsprocessen.
   6.2 Skalning:
   Övervaka prestanda och användning för att skal upp eller ned efter behov.
   Optimera kod och infrastruktur för att hantera ökande trafik och användarbas.
