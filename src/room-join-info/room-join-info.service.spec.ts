import { Test, TestingModule } from '@nestjs/testing';
import { RoomJoinInfoService } from './room-join-info.service';

describe('RoomJoinInfoService', () => {
  let service: RoomJoinInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomJoinInfoService],
    }).compile();

    service = module.get<RoomJoinInfoService>(RoomJoinInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
