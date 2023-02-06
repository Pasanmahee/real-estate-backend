import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertiesService } from './properties.service';

describe('Properties Controller', () => {
  let controller: PropertiesController;
  let service: PropertiesService;
  const createPropertyDto: CreatePropertyDto = {
    title: 'Title #1',
    slug: '/slug#1',
    location: 'Colombo',
    description: 'Description #1',
    price: 200,
    type: "Single",
    status: "For Sale",
    area: 50000,
    property_image: "Image URL #1"
  };

  const mockProperty = {
    title: 'Title #1',
    slug: '/slug#1',
    location: 'Colombo',
    description: 'Description #1',
    price: 200,
    type: "Single",
    status: "For Sale",
    area: 50000,
    property_image: "Image URL #1"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [
        {
          provide: PropertiesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                title: 'Title #1',
                slug: '/slug#1',
                location: 'Colombo',
                description: 'Description #1',
                price: 200,
                type: "Single",
                status: "For Sale",
                area: 50000,
                property_image: "Image URL  #1"
              },
              {
                title: 'Title #2',
                slug: '/slug#2',
                location: 'Kandy',
                description: 'Description #2',
                price: 201,
                type: "Family",
                status: "For Sale",
                area: 50001,
                property_image: "Image URL #2"
              },
              {
                title: 'Title #3',
                slug: '/slug#3',
                location: 'Galle',
                description: 'Description #3',
                price: 202,
                type: "Villa",
                status: "For Rent",
                area: 50002,
                property_image: "Image URL #3"
              }
            ]),
            create: jest.fn().mockResolvedValue(createPropertyDto),
          },
        },
      ],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
    service = module.get<PropertiesService>(PropertiesService);
  });

  describe('create()', () => {
    it('should create a new property', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockProperty);

      await controller.create(createPropertyDto);
      expect(createSpy).toHaveBeenCalledWith(createPropertyDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of properties', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          title: 'Title #1',
          slug: '/slug#1',
          location: 'Colombo',
          description: 'Description #1',
          price: 200,
          type: "Single",
          status: "For Sale",
          area: 50000,
          property_image: "Image URL #1"
        },
        {
          title: 'Title #2',
          slug: '/slug#2',
          location: 'Kandy',
          description: 'Description #2',
          price: 201,
          type: "Family",
          status: "For Sale",
          area: 50001,
          property_image: "Image URL #2"
        },
        {
          title: 'Title #3',
          slug: '/slug#3',
          location: 'Galle',
          description: 'Description #3',
          price: 202,
          type: "Villa",
          status: "For Rent",
          area: 50002,
          property_image: "Image URL #3"
        }
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
