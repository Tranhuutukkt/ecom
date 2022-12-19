import {useSelector} from "react-redux";
import React, {Fragment, useState} from 'react';
import {useParams} from "react-router-dom";
import {useModal, useProduct} from "@/hooks";

const getFitSize = (sizeTable, profile) => {
    let fitSize = [-1, -1, -1];
    for (let i = 0; i < sizeTable.length; i++){
        if (profile.height < sizeTable[i].body_height){
            if (fitSize[0] === -1) fitSize[0] = i;
            else {
                if (profile.height - sizeTable[i].body_height > profile.height - sizeTable[fitSize[0]].body_height){
                    fitSize[0] = i;
                }
            }
        }

        if (profile.hip > sizeTable[i].hip){
            if (fitSize[1] === -1) fitSize[1] = i;
            else {
                if (profile.hip - sizeTable[i].hip < profile.hip - sizeTable[fitSize[1]].hip){
                    fitSize.hip = i;
                }
            }
        }

        if (profile.waist > sizeTable[i].waist){
            if (fitSize[2] === -1) fitSize[2] = i;
            else {
                if (profile.waist - sizeTable[i].waist < profile.waist - sizeTable[fitSize[2]].waist){
                    fitSize[2] = i;
                }
            }
        }

    }

    let mf = 1;
    let m = 0;
    let item;
    for (let i=0; i<fitSize.length; i++)
    {
        for (let j=i; j<fitSize.length; j++)
        {
            if (fitSize[i] === fitSize[j])
                m++;
            if (mf<m)
            {
                mf=m;
                item = fitSize[i];
            }
        }
        m=0;
    }
    return (item === undefined || item === -1) ? Math.max(...fitSize) : item;
    console.log(fitSize);
}

const SuggestSize = (props) => {
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
                    <p>Your measure is:<br/> Height {profile.height} cm; hip size {profile.hip} cm; waist size {profile.waist} cm.<br/>
                        You may fit with size {sizeTable[fit].type}.</p>
                </div>
            )}
        </div>


    )

}
export default SuggestSize;