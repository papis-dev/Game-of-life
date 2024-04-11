document.addEventListener('DOMContentLoaded', function () {
    const numRows = 30;
    const numCols = 50;
    const cellSize = 10;
    const updateInterval = 100; // Intervalle de mise à jour en millisecondes

    // Initialisation de la grille
      const grid = Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, () => Math.random() > 0.7 ? 1 : 0)
      );

      const app = document.getElementById('app');

      // Fonction pour mettre à jour la grille
      function updateGrid() {
        const newGrid = [];

        for (let row = 0; row < numRows; row++) {
          const newRow = [];

          for (let col = 0; col < numCols; col++) {
            const neighbors = countNeighbors(row, col);
            const isAlive = grid[row][col];

            // Appliquer les règles du jeu
            if (isAlive && (neighbors < 2 || neighbors > 3)) {
              newRow.push(0); // Mort par sous-population ou surpopulation
            } else if (!isAlive && neighbors === 3) {
              newRow.push(1); // Naissance
            } else {
              newRow.push(isAlive); // Rester en vie
            }
          }

          newGrid.push(newRow);
        }

        grid.length = 0;
        grid.push(...newGrid);

        // Mettre à jour l'interface graphique
        renderGrid();
      }

      // Fonction pour compter les voisins d'une cellule
      function countNeighbors(row, col) {
        const neighbors = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1], [1, 0], [1, 1],
        ];

        return neighbors.reduce((count, [rowOffset, colOffset]) => {
          const newRow = row + rowOffset;
          const newCol = col + colOffset;

          if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
            count += grid[newRow][newCol];
          }

          return count;
        }, 0);
      }

      // Fonction pour afficher la grille dans l'interface graphique
      function renderGrid() {
        app.innerHTML = ''; // Effacer le contenu actuel

        const gridElement = document.createElement('div');
        gridElement.className = 'grid';

        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            const cellElement = document.createElement('div');
            cellElement.className = `cell ${grid[row][col] ? 'alive' : ''}`;
            cellElement.style.width = `${cellSize}px`;
            cellElement.style.height = `${cellSize}px`;

            gridElement.appendChild(cellElement);
          }
        }

        app.appendChild(gridElement);
      }

      // Mettre à jour la grille à intervalles réguliers
    setInterval(updateGrid, updateInterval);

      // Afficher la grille initiale
    renderGrid();
});
