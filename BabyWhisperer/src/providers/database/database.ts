import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite'

@Injectable()
export class DatabaseProvider {
public db:SQLiteObject;

  constructor(public http: HttpClient, public storage:SQLite) {

  }

  public getDB(){
    return this.storage.create({
      name: 'database.db',
      location: 'default'
    });
  }

  public dropDB(){
    return this.storage.deleteDatabase({
      name: 'database.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
        this.insertDefaultItemsSteps(db);
      })
      .catch(e => console.log(e));
  }
  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS schedule(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, hour TEXT, type TEXT, description TEXT)'],
      ['CREATE TABLE IF NOT EXISTS meals(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, hour TEXT, type TEXT, description TEXT, date TEXT)'],
      ['CREATE TABLE IF NOT EXISTS naps(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, date TEXT, hourStart TEXT, hourStop TEXT, time NUMBER)'],
      ['CREATE TABLE IF NOT EXISTS napsSchedule(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, date TEXT, hourStart TEXT, hourStop TEXT, time NUMBER)'],
      ['CREATE TABLE IF NOT EXISTS visits(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, purpose TEXT, startTime TEXT, adress TEXT)'],
      ['CREATE TABLE IF NOT EXISTS docs(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, name TEXT, surname TEXT, specialisation TEXT, adress TEXT, tel NUMBER)'],
      ['CREATE TABLE IF NOT EXISTS diapers(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, date TEXT, hour TEXT, type TEXT)'],
      ['CREATE TABLE IF NOT EXISTS child(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, weight NUMBER, height NUMBER, foot NUMBER, date TEXT)'],
      ['CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, title TEXT, date TEXT, note TEXT, category TEXT)'],
      ['CREATE TABLE IF NOT EXISTS steps(id INTEGER PRIMARY KEY AUTOINCREMENT, childId NUMBER, date TEXT, name TEXT, description TEXT, passed TEXT)'],
      ['CREATE TABLE IF NOT EXISTS profile(id INTEGER PRIMARY KEY AUTOINCREMENT, birthday TEXT, name TEXT, picture TEXT)']
    ])
      .catch(e => console.error(e));
  }

  private insertDefaultItemsSteps(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from steps', <any>{})
    .then((data: any) => {
      if (data.rows.item(0).qtd == 0) {
 
        db.sqlBatch([
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Skupienie wzroku', 'Noworodek potrafi skupiać wzrok na przedmiotach i osobach oraz śledzić przedmioty poruszające się w jego polu widzenia.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', '', 'leżąc na brzuchu, może już umieć unieść głowę i ramiona na wysokość 5 cm i utrzymać się w tej pozycji coraz dłużej.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', '', 'W pozycji pionowej zachowuje chwiejnie wyprostowaną postawę, a podtrzymywane w pozycji pionowej dobrze kontroluje ustawienie głowy', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', '', 'samodzielnie przewraca się z boku na plecy', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', '', 'Leżąc na pleckach, dziecko zaczepia zawieszone w zasięgu rąk zabawki i niekiedy udaje mu się utrzymać przedmiot włożony mu przez dorosłego do ręki.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Pierwszy uśmiech', 'Dziecko uśmiecha się w reakcji na uśmiech innej osoby lub na coś, co mu się szczególnie spodoba.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Pierwsze dźwięki', 'Zaczyna wydawać też krótkie gardłowe dźwięki: „agu”, „ga”, „kha”, „ehe”, „he” (tzw. głużenie).', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', '', 'leżąc na brzuchu (w tzw. pozycji żabki), opierać się symetrycznie na przedramionach i podnosić główkę tak wysoko, że jest w stanie patrzeć prawie na wprost.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Reakcja na ruch', 'Potrafi śledzić wzrokiem przedmiot, który znajduje się ok. 15 cm od jego twarzy i porusza się w ruchu kołowym.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', '', 'Niemowlę położone na plecach wytrwale próbuje obrócić się na bok. I coraz częściej mu się to udaje. ', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'natężoną reakcją orientacyjną', 'Niemowlę w odpowiedzi na jakiś interesujący dla niego bodziec skierowuje oczy w tę stronę z równoczesnym otwarciem buzi i zahamowaniem innych ruchów.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Papużka', 'Niemowlę lubi powtarzać usłyszane odgłosy. Na głos dorosłego odpowiada ciągiem długich gardłowych dźwięków.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', '', 'trzymany pionowo niemowlak zaczyna mocno utrzymywać główkę, a położony na brzuszku unosi ją pewnie. Dziecko może też w tej pozycji oprzeć się na samych dłoniach, jednocześnie prężąc nóżki – wówczas buja się na brzuszku jak kołyska.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Pierwsze próby raczkowania', 'Niemowlę umie już je wyprostować, próbuje się nimi odpychać.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Chwyt', 'Niemowlę pewnie sięga ręką do przedmiotu, często udaje mu się go chwycić. Dziecko chwyta całą dłonią bez użycia kciuka, który zwykle pozostaje w środku dłoni.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Manifestecja obecności', 'Nowo odkrytą umiejętnością jest radosny, głośny śmiech. Oprócz tego wydaje okrzyki od wysokich do niskich tonów, grucha, cmoka. ', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Foczka', ' Potrafi podnieść klatkę piersiową niemal pod kątem prostym do podłoża. To tzw. pozycja „foki”, która zapowiada przejście do następnego etapu rozwoju – raczkowania.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Mały akrobata', 'Kiedy leży na plecach sięga do stóp i prowadzi je do ust, aktywnie unosi głowę, wspiera się na głowie i nóżkach, podnosi brzuszek i poznaje świat do góry nogami.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Wtęp do samodzielności', 'Może też trzymać kubek obiema rękami i unosić do ust. ', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Pierwsze ząbki', '', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Siedzenie', ' Siada podciągane za obie ręce. W tym wieku dziecku czasem udaje się siedzieć prosto samodzielnie, jednak po krótkiej chwili zwykle wywraca się ponownie.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Próby pełzania', 'w pozycji na brzuszku próbuje pełzać do tyłu. ', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Samodzielne siadanie', 'Niemowlę umie samo podciągać się do pozycji siedzącej,', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Pełzanie', ' W pozycji na brzuszku posuwa się okrężnie i zaczyna pełzać do przodu.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Próby wstawania', 'Czasem stara podnieść się do stania. Niemal jednocześnie ze wstawaniem twoje dziecko może wykonać pierwsze kroki,', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Raczkowanie', 'raczkować, choć są też takie dzieci, które omijają ten etap rozwoju i poruszają się w inny sposób (np. pełzając)', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Samodzielne stanie', ' potrafią już przez chwilę samodzielnie ustać na szeroko rozstawionych nogach. Niemowlę może sprawiać wtedy wrażenie, że ugina się pod własnym ciężarem, ale ono w ten sposób po prostu szuka środka ciężkości.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Naśladowanie', 'Dziecko stara się naśladować otaczające je osoby, uwielbia się również popisywać umiejętnościami', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Gaworzenie', 'Dziecko gaworzy, artykułując szereg sylab. Może już nawet przekształcać dźwięki swego gaworzenia w dające się rozpoznać słowa, np. „da” w sensie „daj” czy „ba” jako „bach!”. ', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Samodzielne jedzenie', 'Dziecko potrafi samodzielnie trafić butelką do ust, łyżeczka z jedzeniem także ląduje w buzi', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Gryzienie mamy, taty', 'Dziecko w ten sposób testuje swoje ząbki. Co oczywiście nie oznacza, że masz się zgadzać na rolę testera. Kiedy niemowlę zamierza cię ugryźć, kategorycznie je odsuń i powiedz, że tak nie wolno robić, bo to cię boli. Jeśli będziesz postępować konsekwentnie, dziecko szybko zrozumie, że takie zachowanie jest zakazane.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Schylanie', 'dziecko potrafi schylić się lub ukucnąć, przytrzymując się jakiegoś mebla.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Mówienie', 'Niemowlę wymawia ze zrozumieniem pierwsze dwusylabowe słowa i naśladuje dźwięki. Przyswaja sobie coraz więcej słów, prawdopodobnie zna już dobrze słowa „mama”, „tata”, „pa-pa”, „spać” i „nie”.', 'false' ]],
          ['insert into steps (date, name, description, passed) values (?,?,?,?)', ['', 'Samodzielny krok', '', 'false' ]]
         
        ])
          .then(() => console.log('Dane domyślne dodane'))
          .catch(e => console.error(e));
 
      }
    })
    .catch(e => console.error( e));
  }
}
 