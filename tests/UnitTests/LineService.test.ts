import { LineService } from '../../src/Infrastructure/implementations/AppServices/LineServiceImpl.js';
import { LineBuilder } from '../Builders/LineBuilder.js';

describe('LineService', () => {
    describe('update', () => {
        test('should update coordinates of line', () => {

            // Arrange  
            const line = new LineBuilder()
                .setAngle(1.5355168532013055)
                .setVelocity(8)
                .setStartPoint({ x: 864.4996591081142, y: 2888.6466007833396 })
                .setEndPoint({ x: 868.0268746748764, y: 2988.5843751749344 })
                .build()
            const lineService = new LineService()
            // Act

            lineService.update(line)

            // Assert

            expect(line.Spoint).toEqual({ x: 864.7818363534552, y: 2896.641622734667 })
            expect(line.Epoint).toEqual({ x: 868.3090519202174, y: 2996.579397126262 })

        });

    });
    describe('isOutOfBounds', () => {
        test('should check if if Out Of map Bounds', () => {

            // Arrange  
            const line = new LineBuilder()
                .setStartPoint({ x: 864.4996591081142, y: 2888.6466007833396 })
                .setEndPoint({ x: 868.0268746748764, y: 2988.5843751749344 })
                .build()
            const lineService = new LineService()
            // Act

            const result = lineService.isOutOfBounds(line)

            // Assert

            expect(result).toEqual(false)


        });

    });
}); 
