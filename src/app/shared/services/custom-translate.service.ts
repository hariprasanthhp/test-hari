import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { German } from 'src/assets/language/german.service';
import { Spanish } from 'src/assets/language/spanish.service';
import { EnglishJSON } from '../../../assets/language/english.service';
import { FrenchJSON } from '../../../assets/language/french.service';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {
  public selectedLanguage = new Subject<any>();
  public defualtLanguage: any;
  languageLocalStorage = sessionStorage.getItem('defaultLanguage');

  fr = {
    "emptyTable": "Pas de données disponibles dans la table",
    "info": "Affichage de _START_ à _END_ des _TOTAL_ entrées",
    "infoEmpty": "Affichage de 0 à 0 des 0 entrées",
    "infoFiltered": "(filtrées à partir des _MAX_ entrées totales)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Affiche  _MENU_ entrées",
    "loadingRecords": "Chargement...",
    "processing": "En traitement...",
    "search": "Chercher:",
    "zeroRecords": "Aucun enregistrement correspondant trouvé",
    "paginate": {
      "first": "Le début",
      "last": "Dernière",
      "next": "Suivant",
      "previous": "Précédent"
    }
  }
  es = {
    "emptyTable": "No hay datos disponibles en la tabla",
    "info": "Se muestran del _START_ al _END_ de _TOTAL_ resultados",
    "infoEmpty": "Se muestran del 0 al 0 de 0 resultados",
    "infoFiltered": "(filtrado de un total de _MAX_ entradas)",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "Mostrar _MENU_ resultados",
    "loadingRecords": "loadingRecords...",
    "processing": "processing...",
    "search": "Buscar:",
    "zeroRecords": "No se han encontrado registros coincidentes",
    "paginate": {
      "first": "Primero",
      "last": "Último",
      "next": "Siguiente",
      "previous": "Anterior"
    }
  }

  de_DE = {
    "emptyTable": "Keine Daten in Tabelle verfügbar",
        "info": "Angezeigt _START_ bis _END_ von _TOTAL_ ergebnissen",
        "infoEmpty": "Angezeigt 0 bis 0 von 0 ergebnissen",
        "infoFiltered": "(gefiltert aus _MAX_ Einträgen)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Zeige _MENU_ Ergebnisse",
    "loadingRecords": "loadingRecords...",
    "processing": "processing...",
        "search": "Suche",
        "zeroRecords": "Keine passenden Datensätze gefunden",
        "paginate": {
            "first": "Erste Seite",
            "last": "Letzte",
            "next": "Weiter",
            "previous": "Zurück"
    }
  }

  constructor(
    private english: EnglishJSON,
    private french: FrenchJSON,
    private spanish: Spanish,
    private german: German
  ) {
    if (this.languageLocalStorage == null || this.languageLocalStorage == 'en') {
      this.defualtLanguage = this.english.data;
      this.selectedLanguage.next(this.english.data);
    } else if (this.languageLocalStorage == 'fr') {
      this.defualtLanguage = this.french.data;
      this.selectedLanguage.next(this.french.data);
    } else if (this.languageLocalStorage == 'es') {
      this.defualtLanguage = this.spanish.data;
      this.selectedLanguage.next(this.spanish.data);
    } else if (this.languageLocalStorage == 'de_DE') {
      this.defualtLanguage = this.german.data;
      this.selectedLanguage.next(this.german.data);
    }
  }

  changeLanguage(language: String) {
    if (language == 'en') {
      this.selectedLanguage.next(this.english.data);
      this.defualtLanguage = this.english.data;
    } else if (language == 'fr') {
      this.selectedLanguage.next(this.french.data);
      this.defualtLanguage = this.french.data;
    } else if (language == 'es') {
      this.selectedLanguage.next(this.spanish.data);
      this.defualtLanguage = this.spanish.data;
    } else if (language == 'de_DE') {
      this.defualtLanguage = this.german.data;
      this.selectedLanguage.next(this.german.data);
    }
  }

  getFRTable() {
    let fr = {
      "emptyTable": "Aucune donnée disponible dans le tableau",
      "info": "Affichage de _START_ à _END_ des _TOTAL_ entrées",
      "infoEmpty": "Affichage de 0 à 0 des 0 entrées",
      "infoFiltered": "(filtrées à partir des _MAX_ entrées totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Afficher les _MENU_ entrées",
      "loadingRecords": "Chargement...",
      "processing": "En traitement...",
      "search": "Chercher:",
      "zeroRecords": "Aucun enregistrement correspondant trouvé",
      "paginate": {
        "first": "Le début",
        "last": "Dernière",
        "next": "Suivant",
        "previous": "Précédent"
      }
    }

    return fr;
  }
}
