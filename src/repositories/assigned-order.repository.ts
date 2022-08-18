/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { AssignedOrder } from "../models/assigned-order.model";
import { getRepository } from "typeorm";

export const createAssignedOrder = async (data: AssignedOrder) => {
    try{
    const assignedRepository = getRepository(AssignedOrder)
    const assignedOrderFounded = await assignedRepository.findOne(
        {
            where: {
                orderNumber: data.orderNumber,
                userId: data.userId
            }
        });
        console.log(`data assignedOrderFounded - ${JSON.stringify(assignedOrderFounded)}`);
    if(!assignedOrderFounded) {
        const assingedOrderCreated = assignedRepository.save(data)
        if (!assingedOrderCreated) throw new Error(`Could not create assigned order`);
        return assingedOrderCreated;
    } else{
        throw new Error(`Order ${assignedOrderFounded.orderNumber} already exist`);
    }
    } catch (error: any) {
        console.error(error.message)
        throw error;
    }
};

export const getAssignedOrderById = async (orderNumber: string) => await getRepository(AssignedOrder).findOne({
    where: {
        orderNumber
    }
})

export const updateAssignedOrderRepository = async (assignedOrder: Partial<AssignedOrder>, orderNumber: string) => {
    try {
        const assignedRepository = getRepository(AssignedOrder)
        const assignedOrderFounded = await assignedRepository.findOne(
            {
                where: {
                    orderNumber,
                    userId: assignedOrder?.userId,
                }
            });
        if(assignedOrderFounded) {
            const orderUpdated = await assignedRepository.update(assignedOrderFounded.id, assignedOrder);
            if(!orderUpdated) throw new Error(`could not update assigned order for - ${assignedOrder?.userId}`)
        } else {
            throw new Error(`Could not found any assigned order for id ${assignedOrder?.userId}`)
        }
    } catch (error: any) {
        console.error(error.message)
        throw error   
    }
};

export const removeAssignedOrderById = async (orderNumber: string) => {
    const assignedOrder = getRepository(AssignedOrder);
    const orderNumberFinded = await assignedOrder.findOne({where: {orderNumber}})
    if(orderNumberFinded){
        await assignedOrder.delete(orderNumberFinded?.id);
    } else {
        throw new Error(`Could not found any assigned order with id ${orderNumber}`); 
    }
}