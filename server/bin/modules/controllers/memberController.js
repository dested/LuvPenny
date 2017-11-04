"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let MemberController = class MemberController {
    sayHi() {
        return { name: "Mike", id: '123' };
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MemberController.prototype, "sayHi", null);
MemberController = __decorate([
    common_1.Controller('member')
], MemberController);
exports.MemberController = MemberController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2NvbnRyb2xsZXJzL21lbWJlckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBK0M7QUFLL0MsSUFBYSxnQkFBZ0IsR0FBN0I7SUFFSSxLQUFLO1FBQ0QsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLENBQUE7SUFDakMsQ0FBQztDQUNKLENBQUE7QUFIRztJQURDLFlBQUcsRUFBRTs7Ozs2Q0FHTDtBQUpRLGdCQUFnQjtJQUQ1QixtQkFBVSxDQUFDLFFBQVEsQ0FBQztHQUNSLGdCQUFnQixDQUs1QjtBQUxZLDRDQUFnQiJ9