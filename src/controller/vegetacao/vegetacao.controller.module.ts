import { Module } from "@nestjs/common";
import { VegetacaoController } from "./vegetacao.controller";
import { VegetacaoServiceModule } from "src/service/vegetacao/vegetacao.service.module";

@Module({
    controllers: [VegetacaoController],
    imports: [VegetacaoServiceModule],
})
export class VegetacaoControllerModule { }