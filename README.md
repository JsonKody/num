# Poziční číselné soustavy 🤌🧐🍷


- [Popis](#popis)
- [Instalace](#instalace)
  - [Klonování repozitáře](#klonování-repozitáře)
  - [Instalace závislostí](#instalace-závislostí)
  - [Spuštění aplikace](#spuštění-aplikace)
- [Ovládání](#ovládání)
- [Příspěvky](#příspěvky)
- [Licence](#licence)

## Popis

Vítejte u vizualizace číselných pozičních soustav, vytvořené jako edukační nástroj pro YouTube tutoriál na kanálu JsonKody.

Počáteční záměr byl jednoduchý – vytvořit podpůrný nástroj pro videa o dvojkové soustavě a pozičních soustavách obecně. Projekt se ale rozrostl a přerostl v interaktivní aplikaci, která může sloužit jako převodník nebo výuková pomůcka.

V aplikaci jsou všechny prvky opatřeny 'title' atributem s instrukcemi a vysvětlivkami, stačí držet kurzor nad prvkem a objeví se vám potřebná nápověda.

Aplikace je dostupná ve dvou jazykových mutacích – čeština a angličtina, přepínač jazyků naleznete v pravém dolním rohu.

Protože se jedná o výukovou pomůcku, snažil jsem se ovládací prvky upozadit, aby neodváděly pozornost od hlavního účelu aplikace – pochopení číselných soustav, proto je většina ovládacích prvků poloprůhledná.

### [numeral-playground.jsonkody.cz](http://numeral-playground.jsonkody.cz)
![screenshot](./src/assets/images/screenshot.png)


## Instalace

### Klonování repozitáře
```bash
git clone git@github.com:JsonKody/numeral_playground.git
```

### Instalace závislostí
```bash
npm i
```

### Spuštění aplikace
```bash
npm run dev
```

Aplikaci naleznete po úspěšném spuštění na [localhost:4040](http://localhost:4040).

***Pozn.: já používám na tuto aplikaci u sebe `pnpm`, ale protože tohle píšu hlavně pro začátečníky, zvolil jsem instalaci pro `npm` protože je to 'default' v nodejs. Pokud vás zajímá jak se použije `pnpm` není to vůbec žádná věda - jen nejprve pomoci `npm` nainstalujete `pnpm` a pak už je to skoro stejné:***
```bash
npm install --global pnpm
# nebo zkracene to same
npm i -g pnpm

pnpm i # instalace
pnpm dev # ano na rozdil od npm nemusite psat 'run'
```
***Ještě dodám, že `npm` a `pnpm` by se neměly míchat - použijte buď jedno nebo druhé - pokud už jste nainstalovali pomocí `npm` a chcete zkusit `pnpm`, nejprve smažte složku `node_modules` a pak `package-lock.json`***

## Ovládání

Podrobný návod k ovládání najdete přímo v aplikaci, kde každý prvek obsahuje nápovědu s instrukcemi a vysvětlením.

## Příspěvky

Máte-li nějaké nápady na vylepšení nebo chcete opravit bug, neváhejte vytvořit pull request, či založit `issue`.

## Licence

Numeral Playground je poskytován pod MIT licencí, která je dostupná v souboru [LICENSE](LICENSE).
