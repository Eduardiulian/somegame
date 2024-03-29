import { CollisionService } from '../../src/Infrastructure/implementations/AppServices/CollisionServiceImpl.js';
import { Vector2DRepository } from '../../src/Infrastructure/implementations/Repository/Vector2DRepository.js';
import { PlayerBuilder } from '../Builders/PlayerBuilder.js';
import { IVector2DRepository } from "../../src/domainService/IVector2D.js";



describe('CollisionService', () => {

    describe('applyCollisions', () => {
        beforeEach(() => {

        });

        test('should return null when there is no collision (classic)', () => {
            // Arrange
            const poly1 = new PlayerBuilder()
                .setCentroid({ x: 2161.7473131473976, y: 51.11345606136038 })
                .setVelocity({ x: -0.011051767018156636, y: -0.4498154237036833 })
                .setAcceleration({ x: 0.00005018015274146137, y: 0.00204237083805996 })
                .setNsides(55)
                .setCoordinates(
                    [
                        { x: 2211.5073131473973, y: 51.11345606136038 },
                        { x: 2211.1829642983416, y: 56.78566861751373 },
                        { x: 2210.214146134448, y: 62.383935208466475 },
                        { x: 2208.6134886821005, y: 67.83527386776022 },
                        { x: 2206.4018589590796, y: 73.06861805922316 },
                        { x: 2203.6080889410773, y: 78.01574313795088 },
                        { x: 2200.268599692798, y: 82.61215576288971 },
                        { x: 2196.426926563685, y: 86.79793466616648 },
                        { x: 2192.1697905108354, y: 90.56602595320807 },
                        { x: 2187.4432508385526, y: 93.7253838066795 },
                        { x: 2182.4183641943714, y: 96.37674415020109 },
                        { x: 2177.123998787495, y: 98.43802831220714 },
                        { x: 2171.62917476769, y: 99.88236430131792 },
                        { x: 2166.0055255693046, y: 100.6909229890878 },
                        { x: 2160.3263640599034, y: 100.85316357649114 },
                        { x: 2154.665726794919, y: 100.36697100935552 },
                        { x: 2149.09740883793, y: 99.2386835513299 },
                        { x: 2143.69400172915, y: 97.48301015492224 },
                        { x: 2138.525947143688, y: 95.12283870781167 },
                        { x: 2133.6606185765872, y: 92.18893765422806 },
                        { x: 2129.1614430262803, y: 88.71955488122845 },
                        { x: 2125.0428696583954, y: 84.80048959301212 },
                        { x: 2121.442086487638, y: 80.39691733057161 },
                        { x: 2118.4189883499175, y: 75.58208639172584 },
                        { x: 2115.9122001684027, y: 70.48353655171405 },
                        { x: 2114.00294278034, y: 65.1324680897903 },
                        { x: 2112.7161062756168, y: 59.59864036676021 },
                        { x: 2112.068466536033, y: 53.954195289892176 },
                        { x: 2112.068466536033, y: 48.272716832829374 },
                        { x: 2112.7161062756163, y: 42.62827175596131 },
                        { x: 2114.00294278034, y: 37.0944440329312 },
                        { x: 2115.9122001684023, y: 31.74337557100742 },
                        { x: 2118.418988349917, y: 26.644825730995564 },
                        { x: 2121.4420864876374, y: 21.82999479214972 },
                        { x: 2125.0428696583945, y: 17.426422529709157 },
                        { x: 2129.16144302628, y: 13.50735724149277 },
                        { x: 2133.660618576587, y: 10.037974468493111 },
                        { x: 2138.5259471436875, y: 7.104073414909408 },
                        { x: 2143.694001729149, y: 4.743901967798777 },
                        { x: 2149.097408837929, y: 2.9882285713912466 },
                        { x: 2154.665726794918, y: 1.8599411133653376 },
                        { x: 2160.3263640599025, y: 1.373748546229649 },
                        { x: 2166.005525569304, y: 1.535989133632917 },
                        { x: 2171.629174767689, y: 2.3445478214027133 },
                        { x: 2177.123998787494, y: 3.7888838105134184 },
                        { x: 2182.418364194371, y: 5.85016797251923 },
                        { x: 2187.443250838552, y: 8.501528316041039 },
                        { x: 2192.169790510835, y: 11.660886169512423 },
                        { x: 2196.4269265636844, y: 15.428977456553966 },
                        { x: 2200.268599692798, y: 19.614756359830693 },
                        { x: 2203.608088941077, y: 24.211168984769483 },
                        { x: 2206.401858959079, y: 29.15829406349712 },
                        { x: 2208.6134886821, y: 34.391638254960014 },
                        { x: 2210.2141461344477, y: 39.84297691425373 },
                        { x: 2211.182964298341, y: 45.441243505206465 }
                    ]
                )
                .build();
            const poly2 = new PlayerBuilder()
                .setCentroid({ x: 2478.8217977883764, y: 232.2623357069795 })
                .setVelocity({ x: 0.45517131262305094, y: -0.041508002888209744 })
                .setAcceleration({ x: -0.0020996435031760984, y: 0.00019147078512441105 })
                .setNsides(55)
                .setCoordinates(
                    [
                        { x: 2528.8217977883764, y: 232.2623357069795 },
                        { x: 2528.495884555804, y: 237.9619062015066 },
                        { x: 2527.522393635493, y: 243.5871740782678 },
                        { x: 2525.9140159703525, y: 249.06480536775106 },
                        { x: 2523.6917192229444, y: 254.32339076914053 },
                        { x: 2520.8844744299354, y: 259.2943765797595 },
                        { x: 2517.5288783203305, y: 263.91295839742304 },
                        { x: 2513.668676221141, y: 268.1189259449277 },
                        { x: 2509.3541917701486, y: 271.8574480030932 },
                        { x: 2504.6416708703246, y: 275.0797872195589 },
                        { x: 2499.5925484384707, y: 277.74393547470544 },
                        { x: 2494.272647507124, y: 279.8151615217371 },
                        { x: 2488.7513211206638, y: 281.2664637615991 },
                        { x: 2483.1005482123187, y: 282.0789222501141 },
                        { x: 2477.3939952486917, y: 282.2419453483889 },
                        { x: 2471.706055874712, y: 281.7534078010262 },
                        { x: 2466.1108810787023, y: 280.61967844207743 },
                        { x: 2460.681412520845, y: 278.8555371675522 },
                        { x: 2455.488431627093, y: 276.48398225687043 },
                        { x: 2450.5996368450383, y: 273.53593055511845 },
                        { x: 2446.0787610911125, y: 270.0498144246926 },
                        { x: 2441.984740894556, y: 266.07108072068075 },
                        { x: 2438.3709480696293, y: 261.65159832160344 },
                        { x: 2435.2844939323877, y: 256.84898193926 },
                        { x: 2432.710347713447, y: 251.74919722922846 },
                        { x: 2430.8471491076516, y: 246.34896354905138 },
                        { x: 2429.554105995992, y: 240.78844533861118 },
                        { x: 2428.9033425920697, y: 235.11677625011825 },
                        { x: 2428.9033425920697, y: 229.40789516384157 },
                        { x: 2429.5541059959914, y: 223.7362260753487 },
                        { x: 2430.8471491076516, y: 218.17570786490833 },
                        { x: 2432.7656151326337, y: 212.7988303911103 },
                        { x: 2435.2844939323872, y: 207.67568947469968 },
                        { x: 2438.370948069629, y: 202.87307309235615 },
                        { x: 2441.9847408945557, y: 198.45359069327878 },
                        { x: 2446.078761091112, y: 194.4748569892668 },
                        { x: 2450.599636845038, y: 190.98874085884097 },
                        { x: 2455.4884316270927, y: 188.04068915708893 },
                        { x: 2460.681412520844, y: 185.66913424640705 },
                        { x: 2466.110881078702, y: 183.90499297188177 },
                        { x: 2471.7060558747116, y: 182.7712636129329 },
                        { x: 2477.393995248691, y: 182.2827260655701 },
                        { x: 2483.100548212318, y: 182.44574916384488 },
                        { x: 2488.7513211206633, y: 183.25820765235977 },
                        { x: 2494.272647507123, y: 184.7095098922216 },
                        { x: 2499.59254843847, y: 186.78073593925336 },
                        { x: 2504.641670870324, y: 189.44488419439966 },
                        { x: 2509.3541917701477, y: 192.66722341086523 },
                        { x: 2513.6686762211407, y: 196.40574546903082 },
                        { x: 2517.52887832033, y: 200.61171301653533 },
                        { x: 2520.884474429935, y: 205.2302948341989 },
                        { x: 2523.691719222944, y: 210.20128064481773 },
                        { x: 2525.9140159703525, y: 215.4598660462072 },
                        { x: 2527.522393635493, y: 220.9374973356904 },
                        { x: 2528.495884555804, y: 226.5627652124516 }

                    ]
                )
                .build();
            const vector2DRepository = new Vector2DRepository();
            const collisionService = new CollisionService(vector2DRepository);

            // Act
            const result = collisionService.applyCollisions(poly1, poly2)

            // Assert
            expect(result.min).toBeNull();
        });
    });

    describe('resolveCollision', () => {

        test('should change speed vector of player(london)', () => {
            // Arrange
            const poly1 = new PlayerBuilder()
                .setCentroid({ x: 770.8822536591209, y: 1085.5954239148205 })
                .setVelocity({ x: 0, y: 0 })
                .setAcceleration({ x: 0, y: 0 })
                .setMass(1)
                .setNsides(55)
                .setCoordinates(
                    [
                        { x: 820.6422536591209, y: 1085.5954239148205 },
                        { x: 820.3179048100648, y: 1091.267636470974 },
                        { x: 819.3490866461714, y: 1096.8659030619265 },
                        { x: 817.7484291938237, y: 1102.3172417212204 },
                        { x: 815.5367994708029, y: 1107.5505859126833 },
                        { x: 812.7430294528004, y: 1112.497710991411 },
                        { x: 809.4035402045216, y: 1117.0941236163499 },
                        { x: 805.5618670754083, y: 1121.2799025196266 },
                        { x: 801.2680921497802, y: 1125.000479671913 },
                        { x: 796.5781913502756, y: 1128.2073516601397 },
                        { x: 791.5533047060947, y: 1130.8587120036614 },
                        { x: 786.258939299218, y: 1132.9199961656673 },
                        { x: 780.764115279413, y: 1134.3643321547781 },
                        { x: 775.1404660810277, y: 1135.172890842548 },
                        { x: 769.4613045716263, y: 1135.3351314299512 },
                        { x: 763.8006673066419, y: 1134.8489388628154 },
                        { x: 758.2323493496526, y: 1133.7206514047898 },
                        { x: 752.8289422408727, y: 1131.964978008382 },
                        { x: 747.6608876554111, y: 1129.6048065612715 },
                        { x: 742.7955590883104, y: 1126.6709055076878 },
                        { x: 738.2963835380033, y: 1123.2015227346883 },
                        { x: 734.222014638391, y: 1119.2418869524554 },
                        { x: 730.6255680190235, y: 1114.8436180688939 },
                        { x: 727.5539288616408, y: 1110.0640542451856 },
                        { x: 725.047140680126, y: 1104.9655044051738 },
                        { x: 723.1378832920636, y: 1099.61443594325 },
                        { x: 721.8510467873398, y: 1094.08060822022 },
                        { x: 721.2034070477564, y: 1088.436163143352 },
                        { x: 721.2034070477564, y: 1082.7546846862892 },
                        { x: 721.8510467873397, y: 1077.1102396094213 },
                        { x: 723.1378832920635, y: 1071.5764118863913 },
                        { x: 725.0471406801258, y: 1066.2253434244674 },
                        { x: 727.5539288616407, y: 1061.1267935844555 },
                        { x: 730.6255680190234, y: 1056.3472297607473 },
                        { x: 734.2220146383908, y: 1051.9489608771858 },
                        { x: 738.2963835380032, y: 1047.9893250949528 },
                        { x: 742.79555908831, y: 1044.5199423219533 },
                        { x: 747.6608876554108, y: 1041.5860412683696 },
                        { x: 752.8289422408723, y: 1039.2258698212588 },
                        { x: 758.2323493496523, y: 1037.4701964248513 },
                        { x: 763.8006673066417, y: 1036.3419089668255 },
                        { x: 769.4613045716259, y: 1035.8557163996898 },
                        { x: 775.1404660810274, y: 1036.017956987093 },
                        { x: 780.7641152794127, y: 1036.8265156748628 },
                        { x: 786.2589392992179, y: 1038.2708516639736 },
                        { x: 791.5533047060944, y: 1040.3321358259793 },
                        { x: 796.5781913502752, y: 1042.983496169501 },
                        { x: 801.2680921497799, y: 1046.1903681577278 },
                        { x: 805.561867075408, y: 1049.910945310014 },
                        { x: 809.4035402045214, y: 1054.0967242132908 },
                        { x: 812.7430294528002, y: 1058.6931368382295 },
                        { x: 815.5367994708027, y: 1063.6402619169573 },
                        { x: 817.7484291938235, y: 1068.8736061084203 },
                        { x: 819.3490866461714, y: 1074.324944767714 },
                        { x: 820.3179048100648, y: 1079.9232113586668 }
                    ]
                )
                .build();
            const poly2 = new PlayerBuilder()
                .setCentroid({ x: 869.0495946586933, y: 1091.2610544626364 })
                .setVelocity({ x: -6.537363297470599, y: 0 })
                .setAcceleration({ x: -0.8, y: 0 })
                .setMass(1)
                .setNsides(55)
                .setCoordinates(
                    [
                        { x: 918.8695946586934, y: 1091.2610544626364 },
                        { x: 918.5452332072377, y: 1096.9368068067618 },
                        { x: 917.5763724719471, y: 1102.5386532790108 },
                        { x: 915.9731736941205, y: 1108.0005326655557 },
                        { x: 913.7606218504217, y: 1113.2373245615527 },
                        { x: 910.9619230198344, y: 1118.1941035166867 },
                        { x: 907.6206933938996, y: 1122.7936208402557 },
                        { x: 903.7772165752715, y: 1126.9825420579089 },
                        { x: 899.4757541294751, y: 1130.7107847514299 },
                        { x: 894.7833419976025, y: 1133.9202462962517 },
                        { x: 889.7491959694969, y: 1136.577264648107 },
                        { x: 884.4517704594047, y: 1138.6404316282765 },
                        { x: 878.9466268658753, y: 1140.0881079626174 },
                        { x: 873.3195598427704, y: 1140.897732406741 },
                        { x: 867.6368921731473, y: 1141.0610210458315 },
                        { x: 861.9640967228014, y: 1140.6352392052777 },
                        { x: 856.4004990379296, y: 1139.4485298060986 },
                        { x: 850.9862764760445, y: 1137.6910979283966 },
                        { x: 845.814329789276, y: 1135.3309406259568 },
                        { x: 840.9389043069058, y: 1132.3928121195358 },
                        { x: 836.4304575421226, y: 1128.9177178008872 },
                        { x: 832.3478462498247, y: 1124.9510242419653 },
                        { x: 828.7443679989335, y: 1120.5445157318475 },
                        { x: 825.6706584019398, y: 1115.7620807520088 },
                        { x: 823.1618004599779, y: 1110.6606097043511 },
                        { x: 821.2484033633895, y: 1105.2995198613103 },
                        { x: 819.9590400297986, y: 1099.7551610211574 },
                        { x: 819.3105428064993, y: 1094.0999135371155 },
                        { x: 819.3109597074665, y: 1088.414900357779 },
                        { x: 819.9602863600855, y: 1082.7597480474883 },
                        { x: 821.2504628524355, y: 1077.2155783735896 },
                        { x: 823.1646462216183, y: 1071.8547692197835 },
                        { x: 825.674252352347, y: 1066.753666192825 },
                        { x: 828.7486633400757, y: 1061.9716820751632 },
                        { x: 832.352787840122, y: 1057.5657021225813 },
                        { x: 836.4304575421223, y: 1053.6043911243858 },
                        { x: 840.9389043069054, y: 1050.129296805737 },
                        { x: 845.8143297892757, y: 1047.1911682993161 },
                        { x: 850.993086410009, y: 1044.8283622095998 },
                        { x: 856.4004990379293, y: 1043.0735791191744 },
                        { x: 861.9640967228012, y: 1041.8868697199953 },
                        { x: 867.644196183414, y: 1041.460881218704 },
                        { x: 873.3268398429166, y: 1041.62500331396 },
                        { x: 878.9537880605811, y: 1042.4354530525359 },
                        { x: 884.4517704594045, y: 1043.8816772969963 },
                        { x: 889.755842124331, y: 1045.947880706081 },
                        { x: 894.7833419976024, y: 1048.601862629021 },
                        { x: 899.475754129475, y: 1051.8113241738429 },
                        { x: 903.7772165752714, y: 1055.5395668673639 },
                        { x: 907.6206933938995, y: 1059.728488085017 },
                        { x: 910.9619230198343, y: 1064.3280054085858 },
                        { x: 913.7606218504216, y: 1069.2847843637198 },
                        { x: 915.9731736941205, y: 1074.5215762597168 },
                        { x: 917.576372471947, y: 1079.9834556462617 },
                        { x: 918.5452332072377, y: 1085.5853021185108 }


                    ]
                )
                .build();
            const vector2DRepository: IVector2DRepository = {
                multiply: jest.fn(),
                normalize: jest.fn(),
                magnitude: jest.fn(),
                dotproduct: jest.fn(),
                normal: jest.fn(),
                copy: jest.fn()

            };
            const collisionService = new CollisionService(vector2DRepository);

            // Act
            collisionService.resolveCollision(poly1, poly2)

            // Assert
            expect(poly1.velocity).toEqual({ x: -6.515660242183377, y: -0.37604485699031553 });
            expect(poly2.velocity).toEqual({ x: -0.021703055287223036, y: 0.37604485699031553 });
        });
    });



});
