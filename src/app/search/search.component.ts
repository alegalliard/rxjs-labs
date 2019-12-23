import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// URL: `https://swapi.co/api/people/?search=${v}`

/*
Objetivos:
1. não mutar nenhum dado ou criar outras variáveis
2. exiba uma mensagem inicial para o usuário começar a busca
3. deve exibir o resultado de uma nova busca a cada novo valor escrito
4. deve esperar o usuário digitar pelo menos 2 digitos
5. deve esperar o usuário parar de digitar por pelo menos meio segundo
6. deve tentar fazer a requisição pelo menos 5 vezes antes de dar erro
7. deve exibit uma mensagem de 'carregando...' toda vez q começar uma nova busca
8. um resultado de uma busca antiga nunca deve sobrepor uma nova
*/


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent /*implements OnInit*/ {
  starWarsInput = new FormControl;
  results$ = this.starWarsInput.valueChanges.pipe(
    tap()
  );

  constructor(
    private http: HttpClient
  ) { }

}
