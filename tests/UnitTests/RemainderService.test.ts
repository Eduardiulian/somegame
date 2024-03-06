import { RemainderService } from '../../src/Infrastructure/implementations/AppServices/RemainderServiceImpl.js';
import { RemainderDataBuilder } from '../Builders/RemainderBuilder.js';

describe('RemainderService', () => {
    describe('calculatePolygonArea', () => {
        test('should calculate the area for a polygon', () => {

            // Arrange  
            const Remainder = new RemainderDataBuilder()
                .withCoordinates(
                    [
                        { x: 2335.3961858002654, y: 1097.5379232954567 },
                        { x: 2336.2301379636706, y: 1097.2669558118503 },
                        { x: 2341.785027501149, y: 1096.141389304286 },
                        { x: 2347.432013711636, y: 1095.6563692272641 },
                        { x: 2353.0974794939248, y: 1095.8182185592314 },
                        { x: 2358.70756683733, y: 1096.624827346629 },
                        { x: 2364.189139673808, y: 1098.065680210364 },
                        { x: 2369.4707373184488, y: 1100.121993429857 },
                        { x: 2374.4835060687933, y: 1102.7669598175662 },
                        { x: 2379.1620968181383, y: 1105.9660981916734 },
                        { x: 2383.445516981084, y: 1109.67770289102 },
                        { x: 2387.2779256251592, y: 1113.8533874721827 },
                        { x: 2390.6093614427746, y: 1118.4387155007591 },
                        { x: 2393.396394073274, y: 1123.3739102135414 },
                        { x: 2395.602690284101, y: 1128.5946338000408 },
                        { x: 2396.711448831582, y: 1132.3707186362046 }
                    ]

                )
                .withCurNsides(3)
                .withSquare(715.7993381130509)
                .withColor('red')
                .build();
            const remainderService = new RemainderService();

            // Act

            const result = remainderService.calculatePolygonArea(Remainder);

            // Assert
            expect(result).toEqual(715.7993381130509);
        });

    });
});
