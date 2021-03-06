# GraphAlgorithmsVisualization

### Для чого потрібна ця програма?
Програма дозволяє побачити покрокове виконання таких алгоритмів, як: алгоритм Дейкстри, алгоритм Крускала.

### Список функцій
* Відображення заданого орієнтованого графа.
* Відображення заданого неорієнтованого графа.
* Відображення покрокового виконання алгоритма Дейкстри.
* Відображення покрокового виконання алгоритма Крускала.
* Знаходження мінімального кістякового дерева.
* Знаходження найкоротшого шляху від заданої вершини до всіх інших вершин графа.

### Установка
1. Клонуйте репозиторій:<br/>
`git clone https://github.com/Volitair/GraphAlgorithmsVisualization.git`
2. Використайте менеджер пакунків npm для встановлення залежностей:<br/>
`npm install`
3. В файлі ```const.js```замініть матриці суміжності графа на власні, або залиште матриці, які вказані за замовчуванням.
4. Відкрийте файл ```index.html```в будь-якому сучасному браузері.

### Приклад використання програми
Створення екземпляра класу орієнтовного графа та ініціалізація об’єктів графа (вершин, ребер) для подальшого використання:
<br/>
```js
const dirGraph = new DirectedGraph(matrix);
dirGraph.createVertexObj();
dirGraph.createGraphElements();
```

Аналогічно, створення екземпляра класу неорієнтовного графа та ініціалізація його складових:
<br/>
```js
const notDirGraph = new NotDirectedGraph(symmetrMatrix);
notDirGraph.createVertexObj();
notDirGraph.createGraphElements();
```

Функція `drawDirGraph(graph, context)` застосовується для створення зображення, вказаного в аргументах цієї функії, екземпляра орієнтованого графа в заданому контексті:<br/>
```js
drawDirGraph(dirGraph, ctxDir);
```

Функція `drawNotDirGraph(graph, context)` застосовується для створення зображення, вказаного в аргументах цієї функії, екземпляра неорієнтованого графа в заданому контексті:<br/>
```js
drawNotDirGraph(notDirGraph, ctxNotDir);
drawNotDirGraph(notDirGraph, ctxDijkstra);
```

Метод `setWeights(weightsMatrix)` екземпляра неорієнтованого графа встановлює вагу кожному ребру цього неорієнтованого графа::<br/>
```js
notDirGraph.setWeights(weightsMatrix);
```

Метод `drawAllWeights(context)` екземпляра неорієнтованого графа зображує вагу кожного ребра цього графа у вказаному контексті:<br/>
```js
notDirGraph.drawAllWeights(ctxWeights);
notDirGraph.drawAllWeights(ctxWeights2);
```

Створення екземпляра класу алгоритма Крускала для вказаного графа:
```js
const kruskal = new Kruskal(notDirGraph);
```

Метод `kruskalMST()` екземпляра класу алгоритма Крускала повертає масив ребер графа, які входять до мінімального кістякового дерева графа:<br/>
```js
const treeKruskal = kruskal.kruskalMST();
```
### Запуск виконання алгоритмів
Запустити виконання алгоритму можна за допомогою відповідної кнопки.
Після виконання алгоритму результати виводятся в консолі.
Щоб відкрити консоль нажміть `Ctrl+Shift+J`.

### Контакти
[Telegram](https://t.me/Sinishin_vasil)

### License
MIT © [Volitair](https://github.com/Volitair)
