import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { getModelToken } from '@nestjs/mongoose';
import { Property } from './schemas/property.schema';
import { Model } from 'mongoose';

const mockProperty = {
  title: 'Title #1',
  slug: '/slug#1',
  location: 'Colombo',
  description: 'Description #1',
  price: 200,
  type: "Single",
  status: "For Sale",
  area: 50000
};

describe('PropertiesService', () => {
  let service: PropertiesService;
  let model: Model<Property>;

  const propertiesArray = [
    {
      title: 'Title #1',
      slug: '/slug#1',
      location: 'Colombo',
      description: 'Description #1',
      price: 200,
      type: "Single",
      status: "For Sale",
      area: 50000
    },
    {
      title: 'Title #2',
      slug: '/slug#2',
      location: 'Kandy',
      description: 'Description #2',
      price: 201,
      type: "Family",
      status: "For Sale",
      area: 50001
    },
    {
      title: 'Title #3',
      slug: '/slug#3',
      location: 'Galle',
      description: 'Description #3',
      price: 202,
      type: "Villa",
      status: "For Rent",
      area: 50002
    }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getModelToken('Property'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockProperty),
            constructor: jest.fn().mockResolvedValue(mockProperty),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    model = module.get<Model<Property>>(getModelToken('Property'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all properties', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(propertiesArray),
    } as any);
    const properties = await service.findAll();
    expect(properties).toEqual(propertiesArray);
  });

  it('should insert a new property', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'Title #1',
        slug: '/slug#1',
        location: 'Colombo',
        description: 'Description #1',
        price: 200,
        type: "Single",
        status: "For Sale",
        area: 50000
      }),
    );
    const newProperty = await service.create({
      title: 'Title #1',
      slug: '/slug#1',
      location: 'Colombo',
      description: 'Description #1',
      price: 200,
      type: "Single",
      status: "For Sale",
      area: 50000
    });
    expect(newProperty).toEqual(mockProperty);
  });
});
