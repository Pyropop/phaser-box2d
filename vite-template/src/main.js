import * as Phaser from 'phaser';

import { AddSpriteToWorld, CreateBoxPolygon, CreateWorld, STATIC, SetWorldScale, SpriteToBox, UpdateWorldSprites, WorldStep, b2DefaultBodyDef, b2DefaultWorldDef, b2Vec2, pxmVec2 } from './PhaserBox2D.js';

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', '023-ogol.png');
    }

    create ()
    {
        SetWorldScale(30);

        const logo = this.add.image(640, 0, 'logo');

        this.world = CreateWorld({ worldDef: b2DefaultWorldDef() });

        const worldId = this.world.worldId;

        const box = SpriteToBox(worldId, logo, {
            restitution: 1.3,
            friction: 0.01
        });

        AddSpriteToWorld(worldId, logo, box);

        CreateBoxPolygon({ worldId, type: STATIC, bodyDef: b2DefaultBodyDef(), position: pxmVec2(600, -874), size: new b2Vec2(20, 3), friction: 0.5 });
    }

    update (time, delta)
    {
        const worldId = this.world.worldId;

        WorldStep({ worldId, deltaTime: delta });

        UpdateWorldSprites(worldId);
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 1280,
    height: 768,
    scene: Example,
    backgroundColor: '#d2d2d2'
};

const game = new Phaser.Game(config);
