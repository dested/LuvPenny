"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const corsMiddleware_1 = require("../middleware/corsMiddleware");
const checkController_1 = require("./controllers/checkController");
const memberController_1 = require("./controllers/memberController");
let ApplicationModule = class ApplicationModule {
    configure(consumer) {
        consumer.apply(corsMiddleware_1.CorsMiddleware).forRoutes({ path: '/*', method: common_1.RequestMethod.ALL });
    }
};
ApplicationModule = __decorate([
    common_1.Module({
        modules: [],
        controllers: [memberController_1.MemberController, checkController_1.CheckController]
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2FwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwyQ0FBaUU7QUFFakUsaUVBQTREO0FBRTVELG1FQUE4RDtBQUM5RCxxRUFBZ0U7QUFNaEUsSUFBYSxpQkFBaUIsR0FBOUI7SUFDSSxTQUFTLENBQUMsUUFBNkI7UUFDbkMsUUFBUSxDQUFDLEtBQUssQ0FBQywrQkFBYyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsc0JBQWEsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7Q0FDSixDQUFBO0FBSlksaUJBQWlCO0lBSjdCLGVBQU0sQ0FBQztRQUNKLE9BQU8sRUFBRSxFQUFFO1FBQ1gsV0FBVyxFQUFFLENBQUMsbUNBQWdCLEVBQUMsaUNBQWUsQ0FBQztLQUNsRCxDQUFDO0dBQ1csaUJBQWlCLENBSTdCO0FBSlksOENBQWlCIn0=