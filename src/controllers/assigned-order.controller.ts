/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constant/api/http-status-codes.constant";
import { createAssignedOrder, getAssignedOrderById, getAssignedOrders, removeAssignedOrderById, updateAssignedOrderRepository } from "../repositories/assigned-order.repository";

export const addAssignedOrder = async (request: Request, response: Response) => {
    try {
        const data = request.body;
        delete data.decodedPayload;
        console.log(`data controller - ${JSON.stringify(data)}`);
        const orderCreated = await createAssignedOrder(data);
        response.status(HTTP_STATUS_CODES.CREATED).send({data: orderCreated});
    } catch (e) {
        const error = e as any
        console.error(`Could not create assigned order - message: ${error.message}`);
        response.status(HTTP_STATUS_CODES.INTERNAL_SERVER).send({errorMessage: error.message});
        throw e;
    }
};

export const fetchAssignedOrders = async (request: Request, response: Response) => {
    const { skip, take } = request.query;
    try {
        const orders = await getAssignedOrders(Number(skip), Number(take));
        response.status(HTTP_STATUS_CODES.OK).send({data: orders});
    } catch (error: any) {
        console.error(`Could not find assigned order - message: ${error.message}`);
        response.status(HTTP_STATUS_CODES.NOT_FOUND).send({errorMessage: error.message});
        throw error;
    }
};

export const fetchAssignedOrderById = async (request: Request, response: Response) => {
    try {
        const { id: orderNumber } = request.params;
        console.log(`order number: ${orderNumber}`);
        const orderFounded = await getAssignedOrderById(orderNumber);
        response.status(HTTP_STATUS_CODES.OK).send({data: orderFounded});
    } catch (error: any) {
        console.error(`Could not find assigned order - message: ${error.message}`);
        response.status(HTTP_STATUS_CODES.NOT_FOUND).send({errorMessage: error.message});
        throw error;
    }
};

export const updateAssignedOrder = async (request: Request, response: Response) => {
    try {
        const { id: orderNumber } = request.params;
        const data = request.body;
        delete data.decodedPayload;
        await updateAssignedOrderRepository(data, orderNumber);
        response.status(HTTP_STATUS_CODES.OK).send({data: `order updated for user-id ${data?.userId}`});
    } catch (error: any) {
        console.error(`Could not find assigned order - message: ${error.message}`);
        response.status(HTTP_STATUS_CODES.INTERNAL_SERVER).send({errorMessage: error.message});
        throw error;
    }
};

export const deleteAssignedOrderById = async (request: Request, response: Response) => {
    try {
        const { id: orderNumber } = request.params;
        console.log(`deleting order number: ${orderNumber}`);
        await removeAssignedOrderById(orderNumber);
        response.status(201).send({data: `Order ${orderNumber} has been deleted`});
    } catch (error: any) {
        console.error(`Could not find assigned order - message: ${error.message}`);
        response.status(500).send({errorMessage: error.message});
        throw error;
    }
};
