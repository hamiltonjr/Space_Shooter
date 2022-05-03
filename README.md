# Space_Shooter
Jogo de nabinha exercício da DIO. Ainda não subi conteúdo.

Segui a professora por todas as aulas. Depois fiz algumas pequenas alterações na configuração que depois me permitiram modificar o jogo. As mudanças:

- troquei a notação de todas as funções para a notação flecha
- nomeei todos os números mágicos espalhados pelo código em JavaScript
- incluí uma pontuação para as naves abatidas
- com os números mágicos mapeados, pude ajustar melhor o jogo

Há um problema com o buffer de teclado que faz com que muitos inimigos apareçam já destruídos na tela. O problema acaba refletindo na função moveLaser(), pois a pontuação é acrescentada também para essas naves destruídas antes de aparecer na tela. Não consegui descobrir como consertar esse problema. As pesquisas no Google não me mostraram como lidar com o buffer de teclado em Javascript.

Mudanças futuras:
- pontuação diferneciada para cada tipo de inimigo
- armazenamento de hi-score (nome do jogador e sua pontuação)
- sons para o laser e a explosão; música de fundo
- dificuldade crescente: aumento da velocidade dos inimigos

O projeto está no GitHub e poderá receber alterações futuras.
