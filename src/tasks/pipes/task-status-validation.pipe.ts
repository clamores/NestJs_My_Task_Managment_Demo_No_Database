import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
   readonly allowedstatuses = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE, 
   ]
   
    transform(value: any) {
   value = value.toUpperCase();

   if(!this.isStatusValid(value)){
       throw new BadRequestException(`${value} is an invalid value`)
   }

   return value;
   }

   private isStatusValid(status: any) {
       const idx = this.allowedstatuses.indexOf(status);
       return idx !== -1;
   }
}