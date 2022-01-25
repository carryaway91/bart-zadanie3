V otvorenom projekte si sputite príkaz "npm install", čo Vám naštaluje všetky dependencies. Po nainštalovaní spustite príkaz "npm start" a otvorte prehliadač na stánke localhost:3000

Implementované zmeny:

  1. stránkovanie - stránkovanie bolo mienené tak, aby po kliku na šípku usera prehodilo na ďalších 5 kategórií, aby mohol rýchlejšie v galérii listovať. Vymenil som šípku za    dvojšípku, aby to bolo viac zjavnejšie
  2. kategóriu je možné pridať z každej podstránky
  3. obrázky na galleryList a gallery sa načítavajú v custom rozmeroch, originálny rozmer sa načítava len v detaile obrázku
  4. fotka už nie je orezaná
  5. pridaná funkcionalita vymazania fotiek z galérie
  6. detaily fotiek sa prepínajú aj kurzorovými šípkami
  7. okno detailu fotky sa zatvára pri stlačení ESC
  8. loader po odstránení galérii, ktorý posúval obsah dole bol presunutý k názvu Fotogaléria, aby obsah neodsúval
  9. zmaznaný adresár api a preriedené nepotrebné fotografie
 10. warningy som odstránil (nemal som naištalovaný eslint, preto som ich nevidel, moja chyba)
 11. pridaný komponent pre detail obrázka, pre kontrolný panel tlačidiel, pre jednotlivé podstránky s kategóriami, gallery image
 12. vytvorený apiClient aby sa neopakoval reťazec http://api.programator.sk
 13. interakcia s API a niektoré filtračné funkcie boli presunuté do util priečinka aby sa odľahčil gallery a galleryList component
 14. použitý prettier na formátovanie kódu
 15. dodatočne okomentované funkcie

Poznámka: Ďakujem veľmi pekne za konštruktívnu kritiku pri posudzovaní projektu a za návrhy na zmeny naa jeho zlepšenie. 
          Projekt je z môjho hľadiska vďaka posudku optimálnejší.
