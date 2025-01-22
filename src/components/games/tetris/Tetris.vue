<template>

    <div class="tetris-header">

        <div class="tetris-header-left">
            <canvas id="game-field" style="width: 220px; height: 400px;"></canvas>
        </div>
        
        <div class="tetris-header-right">

            <canvas id="next-element-field" style="width: 80px; height: 80px;"></canvas>
    
            <div class="hud">

                <div class="hud-score">Score: {{ 1000 }}</div>
                
                <div class="hud-bonuses">
    
                    <div class="hud-bonuses-title">Bonuses:</div>
    
                    <div class="hud-bonuses-variants">
                        <div class="hud-bonuses-variant">5 /*</div>
                        <div class="hud-bonuses-variant">3 O*</div>
                        <div class="hud-bonuses-variant">1 |_|=*</div>
                    </div>
    
                </div>
    
            </div>

        </div>

        
     </div>

    <div class="tetris-footer">
        <div class="tetris-sound">SOUND</div>

        <div class="tetris-control">

            <div class="tetris-control-linear">
                <button class="control-button">LEFT</button>
                <button class="control-button">DOWN</button>
                <button class="control-button">RIGHT</button>
            </div>

            <div class="tetris-control-rotate">
                <button class="control-button">ROTATE</button>
            </div>

        </div>
    </div>
    
</template>


<script setup lang="ts">

</script>


<style scoped>

#game-field {
    width: 220px;
    height: 400px;
    border: 1px solid black;
    background-color: #3d3c3c;
}

#next-element-field {
    width: 80px;
    height: 80px;
    border: 1px solid black;
    background-color: #3d3c3c;

}

.tetris-header {
    display: flex;
    justify-content: space-around;
    background-color: rgb(194, 132, 252);
    width: 350px;
    padding-bottom: 10px;
}

.tetris-header-right {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tetris-footer {
    width: 350px;
    background-color: #cc74ff;
    padding-top: 10px;
    display: flex;
}

.tetris-control {
    display: flex;
}


</style>