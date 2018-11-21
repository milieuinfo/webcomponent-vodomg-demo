# vodomg-demo

Een demo applicatie voor webcomponenten van de Vlaamse overheid.

## Installatie

```
bower install --save vodomg-demo
```

## Gebruik

Maak gebruik van API docs in het webcomponent element door inline JavaScript commentaar toe te voegen, zoals beschreven [op de website van Polymer](https://polymer-library.polymer-project.org/3.0/docs/tools/documentation). Daarna kan de documentatie gegenereerd worden door het Polymer analyze commando aan te roepen.

```
polymer analyze > analysis.json
```

Tenslotte moet er een index.html bestand aangemaakt worden in de root van de webcomponent folder. Hierin kan vervolgens de vodomg-demo component gebruikt worden.

```html
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
		
		<script type="module" src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
		<script type="module" src="./node_modules/vodomg-demo/vodomg-demo.js"></script>
	</head>
	
	<body>
		<vodomg-demo></vodomg-demo>
	</body>
</html>
```

Voor de webcomponenten van de Vlaamse overheid, hebben we ervoor gekozen deze te bundelen op één [demo pagina](https://milieuinfo.github.io/webcomponenten-demo). Meer informatie en documentatie over het toevoegen van een component aan deze demo pagina te vinden op de [webcomponenten-demo pagina](https://github.com/milieuinfo/webcomponenten-demo).

## Ontwikkelaars

Zie de lijst van [ontwikkelaars](https://github.com/milieuinfo/webcomponent-vo-header/graphs/contributors) die meegewerkt hebben aan de webcomponent.

## Contact

Heb je suggesties, opmerkingen of tips? Voel je dan vrij om ons te contacteren via help@omgevingvlaanderen.be.