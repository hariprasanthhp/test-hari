import { FaUtilsService } from "./fa-utils.service";


describe('FaUtilsService', () => {
    let service: FaUtilsService;
    beforeEach(() => { service = new FaUtilsService(); });

    it('should be bitsToSize', () => {
        service.bitsToSize(100000, true);
        service.bitsToSize(100000);
        service.bitsToSize(0);
    });
  
});