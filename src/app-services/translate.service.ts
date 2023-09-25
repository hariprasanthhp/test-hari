
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { German } from 'src/assets/language/german.service';
import { Spanish } from 'src/assets/language/spanish.service';
import { EnglishJSON } from '../assets/language/english.service';
import { FrenchJSON } from '../assets/language/french.service';
declare let pendo: any;
@Injectable({
    providedIn: 'root'
})
export class TranslateService {
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
        "lengthMenu": "Affiche _MENU_ entrées",
        "loadingRecords": "Chargement...",
        "processing": "En traitement...",
        "search": "Recherche:",
        "zeroRecords": "Aucun enregistrement correspondant trouvé",
        "paginate": {
            "first": "Le début",
            "last": "Dernière",
            "next": "Suivant",
            "previous": "Précédent"
        }
    }

    fr2 = {
        "Showing": "Affichage",
        "to": "à",
        "of": "de",
        "entries": "entrées",
        "paginate": {
            "First": "Le début",
            "Last": "Dernière",
            "Next": "Suivant",
            "Previous": "Précédent"
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
    en = {
        "info": "Showing _START_ to _END_ of _TOTAL_ entries"
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
        private activeRoute: Router,
        private spanish: Spanish,
        private german: German,
    ) {
        if (this.languageLocalStorage == null || this.languageLocalStorage == 'en') {
            this.defualtLanguage = this.english.data;
            // this.ngSelectConfig.notFoundText = this.english.data.noItemsFound;
            this.selectedLanguage.next(this.english.data);
        } else if (this.languageLocalStorage == 'fr') {
            this.defualtLanguage = this.french.data;
            // this.ngSelectConfig.notFoundText = this.french.data.noItemsFound;
            this.selectedLanguage.next(this.french.data);
        } else if (this.languageLocalStorage == 'es') {
            this.defualtLanguage = this.spanish.data;
            // this.ngSelectConfig.notFoundText = this.spanish.data.noItemsFound;
            this.selectedLanguage.next(this.spanish.data);
        } else if (this.languageLocalStorage == 'de_DE') {
            this.defualtLanguage = this.german.data;
            // this.ngSelectConfig.notFoundText = this.german.data.noItemsFound;
            this.selectedLanguage.next(this.german.data);
        }
    }

    changeLanguage(language, fromLogin?: any) {
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
        sessionStorage.setItem('defaultLanguage', language);


        let urls = this.activeRoute.url
        console.log(urls.split('/')[1]);

        let modulesToSkipForPendo = ['systemAdministration', 'organization-admin', 'shad']

        if (modulesToSkipForPendo.indexOf(urls.split('/')[1]) !== -1) {
            console.log('need to install pendo api');
            return;
        } else {
            if (fromLogin) {
                return;
            }
            console.log('pendo is installed');
            this.upDatePendo(language)
        }


    }

    upDatePendo(language) {
        try {
            pendo.updateOptions({
                visitor: {
                    id: localStorage.getItem("calix.userId"), // Required if user is logged in
                    lang: language,
                },
                account: {
                    id: localStorage.getItem("calix.spid"),
                },
            });
        } catch (err) {
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
