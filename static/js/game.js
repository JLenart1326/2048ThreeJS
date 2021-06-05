const textures = {}
async function init() {

    const texturesTab = [
        "/gfx/2.png",
        "/gfx/4.png",
        "/gfx/8.png",
        "/gfx/16.png",
        "/gfx/32.png",
        "/gfx/64.png",
        "/gfx/128.png",
        "/gfx/256.png",
        "/gfx/512.png",
        "/gfx/1024.png",
        "/gfx/2048.png",
    ]
    const textureLoader = new THREE.TextureLoader()
    for (const texturePath of texturesTab) {
        const texture = await textureLoader.loadAsync(texturePath)
        textures[texturePath] = texture
    }
    console.log(textures)

    let cubesInfo = []
    let oldCubesInfo = []
    let cubes = []
    let score = 0
    let scoreText;

    const container = document.getElementById('root');

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)

    var renderer = new THREE.WebGLRenderer();


    const loader = new THREE.FontLoader();


    renderer.setClearColor(0xfbf8ef);

    renderer.setSize(window.innerWidth, window.innerHeight)
    var light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
    scene.add(directionalLight);

    container.append(renderer.domElement);

    camera.position.set(1000, 220, 0)

    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    createBoard()
    spawnTwo()
    spawnTwo()


    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();



    function createBoard() {
        fillCubeInfo()

        loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

            const textMesh = new THREE.TextGeometry( 'Player 1', {
                font: font,
                size: 30,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 5,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 5
            } );
            const materialText = new THREE.MeshBasicMaterial({color: 0x000000,})
            const playernName = new THREE.Mesh(textMesh, materialText)
            playernName.rotateY((Math.PI * 0.5))
            playernName.position.set(0, 300, 70)
            scene.add(playernName)
        } );
        loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

            const textMesh = new THREE.TextGeometry( 'Score: '+ score.toString(), {
                font: font,
                size: 30,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 5,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 5
            } );
            const materialText = new THREE.MeshBasicMaterial({color: 0x000000,})
            scoreText = new THREE.Mesh(textMesh, materialText)
            scoreText.rotateY((Math.PI * 0.5))
            scoreText.position.set(0, 250, 75)
            scene.add(scoreText)
            
        } );

        const material = new THREE.MeshPhongMaterial({
            color: 0xbbada0,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
        })
        const borderLeftGeometry = new THREE.BoxGeometry(80, 460, 30);
        const borderLeft = new THREE.Mesh(borderLeftGeometry, material);
        borderLeft.position.set(0, 0, 215)

        const borderRightGeometry = new THREE.BoxGeometry(80, 460, 30);
        const borderRight = new THREE.Mesh(borderRightGeometry, material);
        borderRight.position.set(0, 0, -215)

        const borderTopGeometry = new THREE.BoxGeometry(80, 30, 400);
        const borderTop = new THREE.Mesh(borderTopGeometry, material);
        borderTop.position.set(0, 215, 0)

        const borderBottomGeometry = new THREE.BoxGeometry(80, 30, 400);
        const borderBottom = new THREE.Mesh(borderBottomGeometry, material);
        borderBottom.position.set(0, -215, 0)

        const planeMaterial = new THREE.MeshPhongMaterial({
            color: 0xcdc1b5,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
        })


        const borderPlaneGeometry = new THREE.PlaneGeometry(400, 400);
        const borderPlane = new THREE.Mesh(borderPlaneGeometry, planeMaterial);
        borderPlane.position.set(-26, 0, 0)
        borderPlane.rotateY((Math.PI * 0.5))

        const secondPlaneMaterial = new THREE.MeshPhongMaterial({
            color: 0xbbada0,
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
        })
        const borderSecondPlaneGeometry = new THREE.PlaneGeometry(400, 400);
        const borderSecondPlane = new THREE.Mesh(borderSecondPlaneGeometry, secondPlaneMaterial);
        borderSecondPlane.position.set(-40, 0, 0)
        borderSecondPlane.rotateY((Math.PI * 0.5))

        const gridHelper = new THREE.GridHelper(399, 4)
        gridHelper.position.set(-23, 0, 0)
        gridHelper.geometry.rotateX((Math.PI * 0.5))
        gridHelper.geometry.rotateY((Math.PI * 0.5))


        scene.add(borderLeft);
        scene.add(borderRight);
        scene.add(borderTop);
        scene.add(borderBottom);
        scene.add(borderPlane);
        scene.add(borderSecondPlane);
        scene.add(gridHelper)
    }
    function fillCubeInfo() {
        for (let i = 0; i < 16; i++) {
            cubesInfo.push({})
            cubesInfo[i]["id"] = i
            cubesInfo[i]["value"] = 0
            cubesInfo[i]["x"] = 20
            if (i > 3 && i < 8) {
                cubesInfo[i]["y"] = 50
                cubesInfo[i]["z"] = 150 - ((i % 4) * 100)
            }
            else if (i >= 8 && i < 12) {
                cubesInfo[i]["y"] = -50
                cubesInfo[i]["z"] = 150 - ((i % 4) * 100)
            }
            else if (i >= 12) {
                cubesInfo[i]["y"] = -150
                cubesInfo[i]["z"] = 150 - ((i % 4) * 100)
            }
            else {
                cubesInfo[i]["y"] = 150
                cubesInfo[i]["z"] = 150 - ((i % 4) * 100)
            }
        }
    }

    function spawnTwo() {
        let randomNumber = Math.floor(Math.random() * 16)
        if (cubesInfo[randomNumber].value == 0) {
            cubesInfo[randomNumber].value = 2
            generateCubes()
            checkForGameOver()
        }
        else {
            spawnTwo()
        }
    }


    function generateCubes() {
        removeCubes()
        for (let i = 0; i < 16; i++) {
            if (!(cubesInfo[i].value === 0)) {
                const materialCube = [
                    new THREE.MeshPhongMaterial({
                        color: switchMaterial(cubesInfo[i].value).color,
                        specular: 0xffffff,
                        shininess: 50,
                        side: THREE.DoubleSide,
                        map: switchMaterial(cubesInfo[i].value).texture
                    }),
                    new THREE.MeshPhongMaterial({
                        color: switchMaterial(cubesInfo[i].value).color,
                        specular: 0xffffff,
                        shininess: 50,
                        side: THREE.DoubleSide,
                    }),
                    new THREE.MeshPhongMaterial({
                        color: switchMaterial(cubesInfo[i].value).color,
                        specular: 0xffffff,
                        shininess: 50,
                        side: THREE.DoubleSide,

                    }),
                    new THREE.MeshPhongMaterial({
                        color: switchMaterial(cubesInfo[i].value).color,
                        specular: 0xffffff,
                        shininess: 50,
                        side: THREE.DoubleSide,

                    }),
                    new THREE.MeshPhongMaterial({
                        color: switchMaterial(cubesInfo[i].value).color,
                        specular: 0xffffff,
                        shininess: 50,
                        side: THREE.DoubleSide,

                    }),
                    new THREE.MeshPhongMaterial({
                        color: switchMaterial(cubesInfo[i].value).color,
                        specular: 0xffffff,
                        shininess: 50,
                        side: THREE.DoubleSide,

                    }),
                ]
                const mesh = new THREE.BoxGeometry(85, 85, 85);
                const cube = new THREE.Mesh(mesh, materialCube);
                cube.position.set(cubesInfo[i].x, cubesInfo[i].y, cubesInfo[i].z)
                cubes.push(cube)
                scene.add(cube)

            }
        }

    }

    function removeCubes() {
        for (let i = 0; i < cubes.length; i++) {
            scene.remove(cubes[i])
        }
        cubes = []

    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (cubesInfo[i].value === cubesInfo[i + 1].value) {
                let combinedTotal = parseInt(cubesInfo[i].value) + parseInt(cubesInfo[i + 1].value)
                cubesInfo[i].value = combinedTotal
                cubesInfo[i + 1].value = 0
                score += combinedTotal
                
            }
        }
        scene.remove(scoreText)
        loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

            const textMesh = new THREE.TextGeometry( 'Score: '+ score.toString(), {
                font: font,
                size: 30,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 5,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 5
            } );
            const materialText = new THREE.MeshBasicMaterial({color: 0x000000,})
            scoreText = new THREE.Mesh(textMesh, materialText)
            scoreText.rotateY((Math.PI * 0.5))
            scoreText.position.set(0, 250, 75)
            scene.add(scoreText)
            
        } );
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (cubesInfo[i].value === cubesInfo[i + 4].value) {
                let combinedTotal = parseInt(cubesInfo[i].value) + parseInt(cubesInfo[i + 4].value)
                cubesInfo[i].value = combinedTotal
                cubesInfo[i + 4].value = 0
                score += combinedTotal
                
            }
        }
        scene.remove(scoreText)
        loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

            const textMesh = new THREE.TextGeometry( 'Score: '+ score.toString(), {
                font: font,
                size: 30,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 5,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 5
            } );
            const materialText = new THREE.MeshBasicMaterial({color: 0x000000,})
            scoreText = new THREE.Mesh(textMesh, materialText)
            scoreText.rotateY((Math.PI * 0.5))
            scoreText.position.set(0, 250, 75)
            scene.add(scoreText)
            
        } );
    }


    document.addEventListener('keyup', control)

    function control(e) {
        if (e.keyCode === 39 || e.keyCode === 68) {
            keyRight()
        }
        else if (e.keyCode === 37 || e.keyCode === 65) {
            keyLeft()
        }
        else if (e.keyCode === 40 || e.keyCode === 83) {
            keyDown()
        }
        else if (e.keyCode === 38 || e.keyCode === 87) {
            keyUp()
        }
    }

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        spawnTwo()


    }
    function keyLeft() {
        console.log(oldCubesInfo)
        moveLeft()
        combineRow()
        moveLeft()
        spawnTwo()

    }
    function keyDown() {
        console.log(oldCubesInfo)
        moveDown()
        combineColumn()
        moveDown()
        spawnTwo()

    }
    function keyUp() {
        console.log(oldCubesInfo)
        moveUp()
        combineColumn()
        moveUp()
        spawnTwo()

    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = cubesInfo[i].value
                let totalTwo = cubesInfo[i + 1].value
                let totalThree = cubesInfo[i + 2].value
                let totalFour = cubesInfo[i + 3].value
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]


                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)


                cubesInfo[i].value = newRow[0]
                cubesInfo[i + 1].value = newRow[1]
                cubesInfo[i + 2].value = newRow[2]
                cubesInfo[i + 3].value = newRow[3]
            }
        }

        generateCubes()
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = cubesInfo[i].value
                let totalTwo = cubesInfo[i + 1].value
                let totalThree = cubesInfo[i + 2].value
                let totalFour = cubesInfo[i + 3].value
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]


                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)


                cubesInfo[i].value = newRow[0]
                cubesInfo[i + 1].value = newRow[1]
                cubesInfo[i + 2].value = newRow[2]
                cubesInfo[i + 3].value = newRow[3]
            }
        }

        generateCubes()
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {

            let totalOne = cubesInfo[i].value
            let totalTwo = cubesInfo[i + 4].value
            let totalThree = cubesInfo[i + 8].value
            let totalFour = cubesInfo[i + 12].value
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]


            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)


            cubesInfo[i].value = newColumn[0]
            cubesInfo[i + 4].value = newColumn[1]
            cubesInfo[i + 8].value = newColumn[2]
            cubesInfo[i + 12].value = newColumn[3]

        }

        generateCubes()
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {

            let totalOne = cubesInfo[i].value
            let totalTwo = cubesInfo[i + 4].value
            let totalThree = cubesInfo[i + 8].value
            let totalFour = cubesInfo[i + 12].value
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]


            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)


            cubesInfo[i].value = newColumn[0]
            cubesInfo[i + 4].value = newColumn[1]
            cubesInfo[i + 8].value = newColumn[2]
            cubesInfo[i + 12].value = newColumn[3]

        }

        generateCubes()
    }

    function checkForGameOver() {
        let zeros = 0
        for (let i = 0; i < cubesInfo.length; i++) {
            if (cubesInfo[i].value == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            console.log("You lost!")
            document.removeEventListener('keyup', control)
        }
    }

    function switchMaterial(value) {
        switch (value) {
            case 2:
                return { "color": 0xeee4da, "texture": textures["/gfx/2.png"] }
                break;
            case 4:
                return { "color": 0xece0c8, "texture": textures["/gfx/4.png"] }
                break;
            case 8:
                return { "color": 0xefb27c, "texture": textures["/gfx/8.png"] }
                break;
            case 16:
                return { "color": 0xf39768, "texture": textures["/gfx/16.png"] }
                break;
            case 32:
                return { "color": 0xf37d63, "texture": textures["/gfx/32.png"] }
                break;
            case 64:
                return { "color": 0xf46042, "texture": textures["/gfx/64.png"] }
                break;
            case 128:
                return { "color": 0xeacf76, "texture": textures["/gfx/128.png"] }
                break;
            case 256:
                return { "color": 0xedcb67, "texture": textures["/gfx/256.png"] }
                break;
            case 512:
                return { "color": 0xecc85a, "texture": textures["/gfx/512.png"] }
                break;
            case 1024:
                return { "color": 0xe7c257, "texture": textures["/gfx/1024.png"] }
                break;
            case 2048:
                return { "color": 0xe8be4e, "texture": textures["/gfx/2048.png"] }
                break;
        }
    }





}
document.addEventListener('DOMContentLoaded', function () {
    init();
})
