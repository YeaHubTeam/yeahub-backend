import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from '../skill.controller';
import { SkillService } from '../skill.service';
import { CreateSkillDto } from '../dto/create-skill.dto';

describe('SkillController', () => {
  let skillController: SkillController;
  let skillService: SkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [
        {
          provide: SkillService,
          useValue: {
            createSkill: jest.fn((dto) => dto),
          },
        },
      ],
    }).compile();

    skillController = module.get<SkillController>(SkillController);
    skillService = module.get<SkillService>(SkillService);
  });

  it('должен создать skill', async () => {
    const createSkillDto: CreateSkillDto = {
      title: 'JAVA',
      description: 'Very nice',
      imageSrc: 'http://example.com/imageSrc.jpg',
    };

    expect(await skillController.createSkill(createSkillDto)).toEqual(
      createSkillDto,
    );
    expect(skillService.createSkill).toHaveBeenCalledWith(createSkillDto);
  });
});
