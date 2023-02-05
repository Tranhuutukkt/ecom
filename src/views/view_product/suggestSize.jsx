import {useSelector} from "react-redux";
import React, {Fragment, useState} from 'react';
import {useParams} from "react-router-dom";
import {useModal, useProduct} from "@/hooks";

const getFitSize = (sizeTable, profile) => {
    let fitSize = [-1, -1, -1, -1];
    for (let i = 0; i < sizeTable.length; i++){
        if (profile.height <= sizeTable[i].body_height){
            if (fitSize[0] === -1) fitSize[0] = i;
            else {
                if (profile.height - sizeTable[i].body_height > profile.height - sizeTable[fitSize[0]].body_height){
                    fitSize[0] = i;
                }
            }
        }
    }

    for ( let i = 0; i < sizeTable.length; i++){
        if (profile.hip <= sizeTable[i].hip){
            if (fitSize[1] === -1) fitSize[1] = i;
            else {
                if (profile.hip - sizeTable[i].hip > profile.hip - sizeTable[fitSize[1]].hip){
                    if (profile.height < sizeTable[i].body_height)  fitSize[1] = i;
                }
            }
        }
    }

    for ( let i = 0; i < sizeTable.length; i++){
        if (profile.waist <= sizeTable[i].waist){
            if (fitSize[2] === -1) fitSize[2] = i;
            else {
                if (profile.waist - sizeTable[i].waist > profile.waist - sizeTable[fitSize[2]].waist){
                    if (profile.height < sizeTable[i].body_height) fitSize[2] = i;
                }
            }
        }
    }

    for ( let i = 0; i < sizeTable.length; i++){
        if (profile.chest <= sizeTable[i].chest){
            if (fitSize[3] === -1) fitSize[3] = i;
            else {
                if (profile.chest - sizeTable[i].chest > profile.chest - sizeTable[fitSize[3]].chest){
                    if (profile.height < sizeTable[i].body_height) fitSize[3] = i;
                }
            }
        }
    }


    const item = Math.max(...fitSize) === -1 ? -1: Math.max(...fitSize);

    return {item, fitSize};
}

const SuggestSize = ({size}) => {
    const { isOpenModal, onOpenModal, onCloseModal } = useModal();
    const profile = useSelector((state) => state.profile);
    const {id} = useParams();
    const {product, isLoading, error} = useProduct(id);
    const sizeTable = product?.sizes.sort((a, b) => (a.body_height < b.body_height ? -1 : 1)) || [];

    const fit = getFitSize(sizeTable, profile);
    return (
        <div>
            {product && !isLoading && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>{size.type? "Size "+size.type : "Choose a size above"}</th>
                                <th>Product size (cm)</th>
                                <th>Your size (cm)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Chest</td>
                                <th>{size?.chest || ''}</th>
                                <th style={{backgroundColor:profile.chest > size.chest ? "lightpink":""}}>{profile.chest}</th>
                            </tr>
                            <tr>
                                <td>Waist</td>
                                <th>{size.waist || ''}</th>
                                <th style={{backgroundColor: profile?.waist > size?.waist ? "lightpink":""}}>{profile.waist}</th>
                            </tr>
                            <tr>
                                <td>Hip</td>
                                <th>{size.hip || ''}</th>
                                <th style={{backgroundColor: profile?.hip > size?.hip ? "lightpink":""}}>{profile.hip}</th>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <th>{size.body_height || ''}</th>
                                <th style={{backgroundColor: profile?.height > size?.body_height ? "lightpink":""}}>{profile.height}</th>
                            </tr>
                        </tbody>
                    </table>
                    <p>{(fit.item === -1)?  "There are currently no sizes that fit you" : 'You may fit with size ' + sizeTable[fit.item].type}.</p>
            </div>
            )}
        </div>
    )

}
export default SuggestSize;